package main

import (
	"database/sql"
	"errors"
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/Aritra640/Excalidraw-Clone/server/Database/db"
	dbhelper "github.com/Aritra640/Excalidraw-Clone/server/Database/dbHandlers"
	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	signin_auth "github.com/Aritra640/Excalidraw-Clone/server/internal/Auth/Signin"
	signup_auth "github.com/Aritra640/Excalidraw-Clone/server/internal/Auth/Signup"

	mailserver "github.com/Aritra640/Excalidraw-Clone/server/internal/MailServer"
	notification "github.com/Aritra640/Excalidraw-Clone/server/internal/MailServer/Notification"
	"github.com/Aritra640/Excalidraw-Clone/server/internal/WS"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
	"github.com/pressly/goose/v3"
)


func main() {

  modeString := flag.String("mode" , "normal" , "normal --start server\ntestmail --test smtp server")
  flag.Parse()

  if err := godotenv.Load() ; err != nil {
    log.Println("Error cannot load .env file, server shutting down...")
    panic("Error godotenv could not load .env file!")
  }
  config.App.Port = os.Getenv("PORT")
  config.App.Prod = os.Getenv("PROD")
  config.App.Google_App_Password = os.Getenv("GOOGLE_APP_PASSWORD")
  config.App.Google_Email = os.Getenv("GOOGLE_EMAIL_ID")
  config.App.SMTP_Server_Host = os.Getenv("SMTP_SERVER_HOST")

  if modeString != nil && *modeString == "testmail" {
    mailid := os.Getenv("TEST_EMAIL")
    err := mailserver.SendTestMail(mailid)

    log.Println("Email id : " , config.App.Google_Email)
    
    if err != nil {
      log.Println("Error: SMTP server crashed: " , err)
    }else{
      log.Println("SMTP test mail successfull!");
    }

    return 
  }else if *modeString == "verifymail" && modeString != nil {
    mailid := os.Getenv("TEST_EMAIL")
    err := mailserver.SendVerifyMail("aritra101" , mailid , "123456")

    log.Println("Email id: " , config.App.Google_Email)

    if err != nil {
      log.Println("Error: SMTP server crashed: " , err)
    }else {
      log.Println("SMTP test mail successfull")
    }
    return 

  }else if *modeString == "sendmail" && modeString != nil {
    mailid := os.Getenv("TEST_EMAIL")
    err := notification.SendNotificationVerifiedUser("aritra" , mailid)

    log.Println("Email id: " , config.App.Google_Email)
    log.Println("App password: " , config.App.Google_App_Password)
    
    if err != nil {
      log.Println("Error: SMTP server crashed: " , err)
    }else {
      log.Println("SMTP server send mail- success!")
    }

    return 
  }else if *modeString == "testdb" && modeString != nil {
    err := db.Connect(); if err != nil {
      log.Println("Failed to setup connection to database!")
      return 
    }
    defer db.Close()
    err = dbhelper.AddTestUser("username1" , "email1" , "1"); if err != nil {
      log.Println("Error : addTestUser failed!")
      log.Println("Database test failed!")
      return 
    }

    log.Println("Database test successfull!")
    return 
  }

  err := start_database()
  if err != nil {
    log.Println("Error: migrations failed , " , err)
    return 
  }
  log.Println("migrations successfull!")

  err = db.Connect()
  if err != nil {
    log.Println("Error: unexpecetedly the database crashed!")
    log.Println("Closing the database...")
    db.Close()
    return
  }
  defer db.Close()
  log.Println("Database connected successfull")

	e := echo.New()

  e.Use(middleware.Recover())
  e.Use(middleware.Logger())
  e.Use(middleware.CORS())

  e.Any("/app/v1/echo" , WS.WStest)

  e.GET("/app/v1/hello" , func(c echo.Context) error {
    return c.JSON(http.StatusOK , map[string]string{
      "message": "Hello! server is working!",
    })
  })

  if config.App.Prod != "true" {
    e.GET("/app/v1/sample-user-signup" , signup_auth.Sample_Signup_User)
  }
  
  //Sign up routes: 
  e.POST("/app/v1/signup" , signup_auth.SignupHandler)
  e.POST("/app/v1/RequestOTP" , signup_auth.SendOTPhandler)
  e.POST("/app/v1/VerifyOTP" , signup_auth.VerifyOTPHandler)
  
  //Sign in routes:
  e.POST("/app/v1/signin" , signin_auth.SigninHandler)

  e.Logger.Fatal(e.Start(config.App.Port))
}

//Start database for migrations set up
func start_database() error  {

  postgresURL := os.Getenv("POSTGRES_CONN_URL")
  if postgresURL == "" { 
    log.Println("Database url empty!")
    log.Println("Database could not be connected")
    return errors.New("error: database url empty")
  }
  pg,err := sql.Open("postgres" , postgresURL)
  if err != nil {
    log.Println("Error: " , err)
    return err
  }
  defer pg.Close()

  //Run migrations
  if err = goose.Up(pg , "./Database/migrations"); err != nil {
    log.Println("Error1: migrations failed: " , err)
    return err
  }
  return nil
}

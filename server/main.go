package main

import (
	"database/sql"
	"errors"
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/Aritra640/Excalidraw-Clone/server/Database/db"
	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
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

  if *modeString == "testmail" {
    mailid := os.Getenv("TEST_EMAIL")
    err := mailserver.SendTestMail(mailid)

    log.Println("Email id : " , config.App.Google_Email)
    
    if err != nil {
      log.Println("Error: SMTP server crashed: " , err)
    }else{
      log.Println("SMTP test mail successfull!");
    }

    return 
  }else if *modeString == "verifymail" {
    mailid := os.Getenv("TEST_EMAIL")
    err := mailserver.SendVerifyMail("aritra101" , mailid , "123456")

    log.Println("Email id: " , config.App.Google_Email)

    if err != nil {
      log.Println("Error: SMTP server crashed: " , err)
    }else {
      log.Println("SMTP test mail successfull")
    }
    return 

  }else if *modeString == "sendmail" {
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

  e.Logger.Fatal(e.Start(config.App.Port))
}

//start database for migrations set up
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

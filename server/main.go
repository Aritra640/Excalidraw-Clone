package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	mailserver "github.com/Aritra640/Excalidraw-Clone/server/internal/MailServer"
	"github.com/Aritra640/Excalidraw-Clone/server/internal/WS"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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
    log.Println("Password : " , config.App.Google_App_Password)
    
    if err != nil {
      log.Println("Error: SMTP server crashed: " , err)
    }else{
      log.Println("SMTP test mail successfull!");
    }

    return 
  }

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

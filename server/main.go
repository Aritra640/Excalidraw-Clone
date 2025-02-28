package main

import (
	"log"
	"net/http"
	"os"

	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	"github.com/Aritra640/Excalidraw-Clone/server/internal/WS"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)


func main() {

  if err := godotenv.Load() ; err != nil {
    log.Println("Error cannot load .env file, server shutting down...")
    panic("Error godotenv could not load .env file!")
  }
  config.App.Port = os.Getenv("PORT")
  config.App.Prod = os.Getenv("PROD")

	e := echo.New()

  e.Use(middleware.Recover())
  e.Use(middleware.Logger())
  e.Use(middleware.CORS())

  e.Any("/app/v1/connection" , WS.WStest)

  e.GET("/app/v1/hello" , func(c echo.Context) error {
    return c.JSON(http.StatusOK , map[string]string{
      "message": "Hello! server is working!",
    })
  })

  e.Logger.Fatal(e.Start(config.App.Port))
}

package WS

import (
	"log"
	"net/http"

	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	errortypes "github.com/Aritra640/Excalidraw-Clone/server/tests/ErrorTypes"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var upgrader = websocket.Upgrader{
  ReadBufferSize: 1024,
  WriteBufferSize: 1024,
  CheckOrigin: func(r *http.Request) bool {
    origin := r.Header.Get("Origin")
    if origin == "https://ExcalidrawClone.iamaritra.xyz" {
      return true

    } else if config.App.Prod != "true" { // Allow all access in dev-mode
      return true
    }
    return false
  },
}

func WStest(c echo.Context) error {

  ws,err := upgrader.Upgrade(c.Response() , c.Request() , c.Response().Header())
  if err != nil {
    log.Println("Something went wrong trying to upgrade --upgrader.Upgrade")
    log.Println(errortypes.ErrWsupgrade.Error())
    return c.JSON(http.StatusInternalServerError , map[string]string{
      "message": errortypes.ErrWsupgrade.Error(),
    })
  }

  defer ws.Close()

  for {
    _,msg,err := ws.ReadMessage()
    if err != nil {
      log.Println("Error while reading message: " , err)
      c.Logger().Error(errortypes.ErrWsreadmessage)
      return c.JSON(http.StatusConflict , map[string]string{
        "message": errortypes.ErrWsreadmessage.Error(),
      })
    }
    
    log.Println("message received (since it is a ping-pong) : " , string(msg))
    if string(msg) == "ping" {
      err := ws.WriteMessage(websocket.TextMessage , []byte("pong"))
      if err != nil {
        log.Println("Error while writing message: " , err)
        c.Logger().Error(errortypes.ErrWswritemessage)
        return c.JSON(http.StatusConflict , map[string]string{
          "message": errortypes.ErrWswritemessage.Error(),
        })
      }
    }else{
      log.Println("message received is not 'ping'!")
    }
  }
}

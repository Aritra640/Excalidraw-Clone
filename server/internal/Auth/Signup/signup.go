package auth

import (
	"log"
	"net/http"

	authtypes "github.com/Aritra640/Excalidraw-Clone/server/Models/AuthTypes"
	servertypes "github.com/Aritra640/Excalidraw-Clone/server/Models/ServerTypes"
	"github.com/labstack/echo/v4"
)


func SignupHandler(c echo.Context) error {

  var newUser authtypes.NewUser
  if err := c.Bind(&newUser); err != nil {
    log.Println("Error: user data could not be fetched from c.Bind: " , err)
    return c.JSON(http.StatusConflict , servertypes.JSONmessage{
      Message: "some error has occured, data could not be fetched!",
    })
  }
  
  passwordChan := make(chan string)
  go hash_Password(newUser.Password , 14 , passwordChan)
  
}

func OTPHandler(c echo.Context) error {

}

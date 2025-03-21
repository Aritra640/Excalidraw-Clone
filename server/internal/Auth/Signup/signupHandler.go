package auth

import (
	"log"
	"net/http"

	dbhelper "github.com/Aritra640/Excalidraw-Clone/server/Database/dbHandlers"
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

  _,err := dbhelper.FindUserByEmailID(newUser.Email)
  if err == nil {
    //User already exists in database 
    return c.JSON(404 , servertypes.JSONmessage{
      Message: "User Data exists",
    })
  }

  passwordChan := make(chan string)
  go hash_Password(newUser.Password , 14 , passwordChan)
  hash := <-passwordChan
  if hash == "" {
    log.Println("Error: password could not be hashed")
    return c.JSON(500 , servertypes.JSONmessage{
      Message: "something went wrong",
    })
  }
  newUser.Password = hash
  addUser(newUser)
  
  return c.JSON(http.StatusOK , servertypes.JSONmessage{
    Message: "Redirect to OTP",
  })
}



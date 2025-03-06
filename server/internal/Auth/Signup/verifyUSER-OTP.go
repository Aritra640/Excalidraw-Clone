package auth

import (
	"log"
	"net/http"

	dbhelper "github.com/Aritra640/Excalidraw-Clone/server/Database/dbHandlers"
	servertypes "github.com/Aritra640/Excalidraw-Clone/server/Models/ServerTypes"
	notification "github.com/Aritra640/Excalidraw-Clone/server/internal/MailServer/Notification"
	"github.com/labstack/echo/v4"
)


type verifyUserInput struct {

  Email string `json:"email"`
  OTP string `json:"otp"`
}

//verify OTP and complete signup process
func VerifyOTPHandler(c echo.Context) error {
  
  var userDetails verifyUserInput
  err := c.Bind(&userDetails) ; if err != nil {
    log.Println("Error: due to some unknown details user details cannot be received in verifyOTPHandler: " , err)
    return c.JSON(http.StatusBadRequest , servertypes.JSONmessage{
      Message: "bad Request",
    })
  }

  match := verifyOTP(userDetails.Email , userDetails.OTP)
  if match {
    
    //Add data to database 
    addUser,flag := getUser(userDetails.Email)
    if !flag {
      log.Println("FATAL ERROR: due to some reason cache storage unexpectedly could not get data in verify-OTP handler, check immediately!")
      return c.JSON(500 , servertypes.JSONmessage{
        Message: "Try again, some thing went wrong!",
      })
    }
    _,err := dbhelper.AddNewVerifiedUser(addUser); if err != nil {
      log.Println("Error: Could not add user: " , err)
      return c.JSON(500 , servertypes.JSONmessage{
        Message: "could not add user , please try again!",
      })
    }

    notification.SendNotificationVerifiedUser("user" , userDetails.Email)
    deleteUserFromCache(userDetails.Email)
    return c.JSON(http.StatusOK , servertypes.JSONmessage{
      Message: "user verified, route to signin",
    })
  }else{
    deleteOTPkey(userDetails.Email)

    log.Printf("For email id: %s, otp could not be verified", userDetails.Email )
    return c.JSON(http.StatusConflict , servertypes.JSONmessage{
      Message: "OTP didnt match, try again , resend otp",
    })
  }
}

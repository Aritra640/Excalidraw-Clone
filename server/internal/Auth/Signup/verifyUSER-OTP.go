package auth

import (
	"log"
	"net/http"

	servertypes "github.com/Aritra640/Excalidraw-Clone/server/Models/ServerTypes"
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
    //TODO: delete cache store user details and add them to the database 
    //TODO: notify user that his account has been verified
    //TODO: send http status code 200, and request signin 
    return c.JSON(http.StatusOK , servertypes.JSONmessage{
      Message: "user verified, route to signin",
    })
  }else{
    //TODO: a good idea to erase the otp 
    log.Printf("For email id: %s, otp could not be verified", userDetails.Email )
    return c.JSON(http.StatusConflict , servertypes.JSONmessage{
      Message: "OTP didnt match, try again , resend otp",
    })
  }
}

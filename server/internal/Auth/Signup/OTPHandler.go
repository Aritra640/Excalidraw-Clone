package auth

import (
	"log"
	"net/http"

	servertypes "github.com/Aritra640/Excalidraw-Clone/server/Models/ServerTypes"
	"github.com/labstack/echo/v4"
)

type UserEmailID struct {
	Email string `json:"email"`
}

// OTP handler --> send otp
func SendOTPhandler(c echo.Context) error {

	var userEmailID UserEmailID
	err := c.Bind(&userEmailID)
	if err != nil {
		log.Println("Error: user email id could not be receiver in SendOTPHandler: ", err)
		return c.JSON(http.StatusBadRequest, servertypes.JSONmessage{
			Message: "bad request",
		})
	}

	//TODO: get user data from cache store
	userDetails, ok := getUser(userEmailID.Email)
	if !ok {
		log.Println("User cannot be found in the cache store in SendOTPHandler : emailID: ", userEmailID.Email)
	}

	//TODO: create otp
  otpChan := make(chan string)
  go getOTP(userEmailID.Email , otpChan)

	//TODO: send verify otp mail
	//TODO: send http status
  c.Response().Header().Add("Username" , userDetails.Username)
  c.Response().Header().Add("Email ID" , userDetails.Email)
  c.Response().Header().Add("Status" , "unverified")
  return c.JSON(http.StatusOK , servertypes.JSONmessage{
    Message: "OTP send successfully",
  })
}

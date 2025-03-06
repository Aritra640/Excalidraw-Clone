package auth

import "github.com/labstack/echo/v4"

func Sample_Signin_User(c echo.Context) error {

  return c.JSON(200 , SigninUserInput{
    Email: "sample@sample.com",
    Password: "Password sample",
  })
}

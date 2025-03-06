package jwt

import (
	"log"

	servertypes "github.com/Aritra640/Excalidraw-Clone/server/Models/ServerTypes"
	"github.com/labstack/echo/v4"
)

func AuthMiddleware_JWT(next echo.HandlerFunc) echo.HandlerFunc {
  return func(c echo.Context) error {

    jwtToken := c.Request().Header.Get("JWT")
    if jwtToken == "" {
      log.Println("Error: could not get auth header")
      return c.JSON(404 , servertypes.JSONmessage{
        Message: "Could not get auth token",
      })
    }

    email,err := VerifyToken(jwtToken); if err != nil {
      log.Println("Error in verifying toknen: " , err)
      return c.JSON(500 , servertypes.JSONmessage{
        Message: "could not verify token",
      })
    }

    c.Request().Header.Add("email" , email)
    return next(c)
  }
}

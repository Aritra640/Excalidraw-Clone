package auth

import (
	"net/http"

	authtypes "github.com/Aritra640/Excalidraw-Clone/server/Models/AuthTypes"
	"github.com/labstack/echo/v4"
)

func Sample_Signup_User(c echo.Context) error {
  sampleUser := authtypes.NewUser{
    Username: "testing username",
    Email: "test@test.test",
    Password: "Unhashed-password",
  }
  return c.JSON(http.StatusOK , sampleUser)
}

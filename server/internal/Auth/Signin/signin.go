package auth

import (
	"net/http"

	servertypes "github.com/Aritra640/Excalidraw-Clone/server/Models/ServerTypes"
	"github.com/labstack/echo/v4"
)

func SigninHandler(c echo.Context) error {

  return c.JSON(http.StatusOK , servertypes.JSONmessage{
    Message: "Sign in route under dev",
  })
}

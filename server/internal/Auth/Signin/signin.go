package auth

import (
	"log"
	"net/http"

	dbhelper "github.com/Aritra640/Excalidraw-Clone/server/Database/dbHandlers"
	servertypes "github.com/Aritra640/Excalidraw-Clone/server/Models/ServerTypes"
	auth "github.com/Aritra640/Excalidraw-Clone/server/internal/Auth/Signup"
	jwt "github.com/Aritra640/Excalidraw-Clone/server/internal/JWT"
	"github.com/labstack/echo/v4"
)

type SigninUserInput struct {
  Email string `json:"email"`
  Password string `json:"password"`
}

//Signin takes emailid , password(un-hashed) 
func SigninHandler(c echo.Context) error {
  
  var signinAttempt SigninUserInput
  err := c.Bind(&signinAttempt); if err != nil {
    log.Println("Error: cannot get sign in user data: " , err)
    return c.JSON(404 , "Something went wrong")
  }

  userData,err := dbhelper.FindUserByEmailID(signinAttempt.Email); if err != nil {
    log.Println("Error cannot find user data")
    return c.JSON(404, "Cannot find user data")
  }

  flag := auth.Verify_Password(userData.PasswordHashed , signinAttempt.Password); if !flag {
    return c.JSON(404 , servertypes.JSONmessage{
      Message: "Password did not match",
    })
  }

  //Password verified


  jwtToken,err := jwt.Create_JWT_token(userData.Email); if err != nil {
    log.Println("Error: could not get jwt token: " , err)
    return c.JSON(500, servertypes.JSONmessage{
      Message: "due to some error signin has failed",
    })
  }
  
  log.Println("Signin successfull for email: " , userData.Email)
  return c.JSON(http.StatusOK , map[string]string{
    "JWT": jwtToken,
  })
}

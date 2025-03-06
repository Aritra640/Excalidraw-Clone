package jwt

import (
	"log"
	"time"

	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	"github.com/golang-jwt/jwt/v5"
)

type MyCustomClaims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

//Create jwt token with email-id of the user, signing method: HS256
func Create_JWT_token(email string) (string ,  error) {

  claims := MyCustomClaims{
    email,
    jwt.RegisteredClaims{
      ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
    },
  }
  log.Println("creating jwt-token with email: " , email)

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
  jwtKey := []byte(config.App.JWT_Secret_Key)
  ss,err := token.SignedString(jwtKey); if err != nil {
    log.Println("Could not create jwt token: " , err)
    return "jwt-not-created", err
  }

  return ss,nil
}

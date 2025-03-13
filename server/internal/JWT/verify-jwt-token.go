package jwt

import (
	"errors"
	"fmt"
	"log"

	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	"github.com/golang-jwt/jwt/v5"
)

func VerifyToken(tokenString string) (string , error) {
  token,err := jwt.ParseWithClaims(tokenString , &MyCustomClaims{} , func(token *jwt.Token) (interface{} , error) {
    //Validate the signing method (eg HMAC)
    if _,ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
      return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
    }
    return []byte(config.App.JWT_Secret_Key), nil
  })

  if err != nil {
    log.Printf("Error parsing token: %v\n" , err)
    return "", errors.New("invalid token") 
  }

  claims,ok := token.Claims.(*MyCustomClaims)
  if !ok || !token.Valid {
    log.Println("invalid token or claims")
    return "", errors.New("error cannot verify token")
  }

  log.Println("Token verification successfully for email: " , claims.Email)
  return claims.Email , nil
}

package auth

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"sync"
)


var OTPstores sync.Map

//return a random otp of 6 digits between 0-9
func getOTP(email string , OTPchan chan string) {
  
  otp := ""
  for i := 0 ; i < 6 ; i ++ {
    num,_ := rand.Int(rand.Reader , big.NewInt(10)) // Random digits between 0-9
    otp += fmt.Sprintf("%d" , num)
  }

  OTPstores.Store(email , otp)
  OTPchan <- otp
}


func verifyOTP(email , otpString string) bool {
  userOTP,ok := OTPstores.Load(email)
  if !ok {
    return false
  }

  otp := userOTP.(string)
  return otp == otpString
 } 

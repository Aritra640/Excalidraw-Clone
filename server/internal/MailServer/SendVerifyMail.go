package mailserver

import (
	"fmt"
	"log"

	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	errortypes "github.com/Aritra640/Excalidraw-Clone/server/tests/ErrorTypes"
	"github.com/wneessen/go-mail"
)

func SendVerifyMail(username , userEmail , otp string) error {
  
  message := mail.NewMsg()
  if err := message.From(config.App.Google_Email); err != nil {
    log.Println("Failed to set FROM address: " , err)
    return errortypes.ErrSmtpfromaddr
  }

  if err := message.To(userEmail);  err != nil {
    log.Println("Failed to set TO address: " , err)
    return errortypes.ErrSmtptoaddr
  }

  BodyString := fmt.Sprintf(`
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h1 style="color: #333; text-align: center;">Hello %s,</h1>
        <p style="font-size: 16px; color: #555; text-align: center;">
            Your registered email is <strong style="color: #333;">%s</strong>.
        </p>
        <p style="font-size: 18px; text-align: center; font-weight: bold; color: #2d89ff;">
            Your OTP is: <span style="font-size: 22px; background-color: #e0e0e0; padding: 5px 10px; border-radius: 5px;">%s</span>
        </p>
        <p style="font-size: 14px; color: #777; text-align: center;">
            Please do not share this OTP with anyone. It is valid for a limited time.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; font-size: 12px; color: #aaa;">
            &copy; 2025 Your Company. All rights reserved.
        </p>
    </div>
`, username , userEmail , otp)

  message.Subject("Excalidraw-clone signup verification, if you have not instantiated a sign up request then please write back at this email id , also forward this mail")
  
  message.SetBodyString(mail.TypeTextHTML , BodyString)


  //Deliver the mail using SMTP 
   client,err := mail.NewClient(
    config.App.SMTP_Server_Host,
    mail.WithPort(587),
    mail.WithSMTPAuth(mail.SMTPAuthPlain),
    mail.WithUsername(config.App.Google_Email),
    mail.WithPassword(config.App.Google_App_Password),
    mail.WithTLSPolicy(mail.TLSMandatory),
  )
  
   if err != nil {
    log.Println("Error: failed to create mail client: " , err)
    return errortypes.ErrSmtpmailclient
  }
  if err = client.DialAndSend(message); err != nil {
    log.Println("Error: failed to send mail: " , err)
    return errortypes.ErrSmtpdialclient
  }

  log.Println("one email verification successfully sent to : " , userEmail)
  return nil
}

package mailserver

import (
	"log"

	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	errortypes "github.com/Aritra640/Excalidraw-Clone/server/tests/ErrorTypes"
	"github.com/wneessen/go-mail"
)


func SendTestMail(email string) error {
  
  message := mail.NewMsg()
  if err := message.From(config.App.Google_Email); err != nil {
    log.Println("Error: failed to set FROM address: " , err)
    return errortypes.ErrSmtpfromaddr
  }
  if err := message.To(email); err != nil {
    log.Println("Error: failed to set TO address: " , err)
    return errortypes.ErrSmtptoaddr
  }

  BodyString := "Testing SMTP server!"
  message.Subject("Testing SMTP server using wnessen/go-mail")
  message.SetBodyString(mail.TypeTextHTML , BodyString)

  //Deliver the mails using SMTP 
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

  log.Println("Test mail sent!")
  return nil
}

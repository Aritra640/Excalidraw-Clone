package notification

import (
	"fmt"
	"log"

	config "github.com/Aritra640/Excalidraw-Clone/server/Models/Config"
	errortypes "github.com/Aritra640/Excalidraw-Clone/server/tests/ErrorTypes"
	"github.com/wneessen/go-mail"
)

func SendNotificationVerifiedUser(username, email string) error {

	message := mail.NewMsg()
	if err := message.From(config.App.Google_Email); err != nil {
		log.Println("Error: failed to set FROM address: ", err)
		return errortypes.ErrSmtpfromaddr
	}
	if err := message.To(email); err != nil {
		log.Println("Error: failed to set TO address: ", err)
		return errortypes.ErrSmtptoaddr
	}

	BodyString := fmt.Sprintf(
		"Hello %s,\n\nYour account has been successfully verified!\n\nUsername: %s\nEmail ID: %s\n\nThank you for verifying your email. You can now access all features of our service.\n\nBest Regards,\nThe Excalidraw Team",username, username, email)

  message.Subject("Excalidraw-clone verification complete")
  message.SetBodyString(mail.TypeTextHTML , BodyString)

  //Deliver the mail 
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

  log.Println("one mail verification successfully sent to : " , email)
  return nil
}

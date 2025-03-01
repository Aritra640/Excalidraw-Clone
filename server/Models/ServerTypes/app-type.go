package servertypes

type AppConfig struct {
	Prod string
	Port string

	Google_Email        string
	Google_App_Password string
	SMTP_Server_Host    string
}

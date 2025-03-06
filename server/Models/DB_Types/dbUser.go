package dbtypes 

type Dbuser struct {
	ID             int32
	Username       string
	Email          string
	PasswordHashed string
}

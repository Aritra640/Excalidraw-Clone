package dbhelper

import (
	"context"
	"log"

	"github.com/Aritra640/Excalidraw-Clone/server/Database/db"
)

func AddTestUser(username, email, password string) error {
	ctx := context.Background()
  queries := db.New(db.DB)

  //Add test user
  addUser := db.AddUserParams{
    Username: username,
    Email: email,
    PasswordHashed: password,
  }
  
  dbUser,err := queries.AddUser(ctx , addUser)
  if err != nil {
    log.Println("Due to some error the AddTestUser func failed: " , err)
    return err
  }

  log.Println("Test data added, please remove this data after use")
  log.Println(dbUser)
  return nil
}

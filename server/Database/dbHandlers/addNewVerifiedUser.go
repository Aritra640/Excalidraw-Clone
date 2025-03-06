package dbhelper

import (
	"context"
	"log"

	"github.com/Aritra640/Excalidraw-Clone/server/Database/db"
	authtypes "github.com/Aritra640/Excalidraw-Clone/server/Models/AuthTypes"
	dbtypes "github.com/Aritra640/Excalidraw-Clone/server/Models/DB_Types"
)

func AddNewVerifiedUser(newUser authtypes.CacheUser) (dbtypes.Dbuser , error) {
  ctx := context.Background()
  queries := db.New(db.DB)

  //Add user 
  addUser := db.AddUserParams{
    Username: newUser.Email,
    PasswordHashed: newUser.Hashed_password,
    Email: newUser.Email,
  }

  dbUser,err := queries.AddUser(ctx , addUser)
  if err != nil {
    log.Println("Error: could not add user data")
    return dbtypes.Dbuser{} ,  err
  }

  retUser := dbtypes.Dbuser{
    ID: dbUser.ID,
    Username: dbUser.Username,
    Email: dbUser.Email,
    PasswordHashed: dbUser.PasswordHashed,
  }
  return retUser , nil
}

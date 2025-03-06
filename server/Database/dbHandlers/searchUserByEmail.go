package dbhelper

import (
	"context"

	"github.com/Aritra640/Excalidraw-Clone/server/Database/db"
	dbtypes "github.com/Aritra640/Excalidraw-Clone/server/Models/DB_Types"
)

func FindUserByEmailID(email string) (dbtypes.Dbuser , error) {
  ctx := context.Background()
  queries := db.New(db.DB)

  sqlUser,err := queries.GetUserByEmail(ctx , email)
  if err != nil {
    return dbtypes.Dbuser{} , err
  }
  
  retUser := dbtypes.Dbuser{
    ID: sqlUser.ID,
    Username: sqlUser.Username,
    PasswordHashed: sqlUser.PasswordHashed,
    Email: sqlUser.Email,
  }
  return retUser , nil
}

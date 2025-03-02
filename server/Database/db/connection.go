package db

import (
	"database/sql"
	"errors"
	"log"
	"os"

	_"github.com/lib/pq"
)

//Database connection struct
var DB *sql.DB

//Start a connection to the database for runtime use
func Connect() error {

  postgresURL := os.Getenv("POSTGRES_CONN_URL")
  if postgresURL == "" {
    return errors.New("error: postgres url could not be found in .env")
  }

  //Connect to database
  DB,err := sql.Open("postgres" , postgresURL)
  if err != nil {
    log.Println("Error: " , err)
    return errors.New("error: could not connect to the database")
  }
  
  //Test the connection
  err = DB.Ping()
  if err != nil {
    log.Println("Error: " , err)
    cerr := Close()
    if cerr != nil {
      log.Println("\n\nFatal error: database could not be pinged or closed")
      return errors.New("error: due to some problem database could not be pinged or close")
    }
    log.Println("database closed!")
    return errors.New("error: cannot ping database")
  }

  log.Println("Database running ...")
  return nil
}

//Close the DB connection
func Close() error {
  
  if DB != nil {
    if err := DB.Close() ; err != nil {
      log.Println("Failed to close database: " , err)
      return errors.New("error: database could not be closed")
    }
  }
  return nil
}

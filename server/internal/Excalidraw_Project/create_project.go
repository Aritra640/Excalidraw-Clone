package excalidrawproject

import (
	"math/rand"
	"net/http"

	"github.com/labstack/echo/v4"
)


func CreateProjectID(c echo.Context) error {
  
  projectID := rand.Intn(1000000)
  //TODO: after generating project id , check that the id doesnot exists in the database 
  //TODO: if the id exists in the database, create a new id 

  return c.JSON(http.StatusOK , map[string]int{
    "project-id": projectID,
  })
}

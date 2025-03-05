package auth

import (
	"sync"
	"time"

	authtypes "github.com/Aritra640/Excalidraw-Clone/server/Models/AuthTypes"
)

var CacheUserStore sync.Map

//addUser adds user data in a storage for 15minutes
func addUser(newUser authtypes.NewUser) {
  CacheUserStore.Store(newUser.Email , authtypes.CacheUser{
    Username: newUser.Username,
    Email: newUser.Email,
    Hashed_password: newUser.Password,
    CreatedAt: time.Now(),
  })
}

//returns the userdata if the user data exists and not expired
func getUser(emailID string) (authtypes.CacheUser , bool) {
  value,ok := CacheUserStore.Load(emailID)
  if !ok {
    return authtypes.CacheUser{} , false
  }
  
  user,ok := value.(authtypes.CacheUser)
  if !ok {
    return authtypes.CacheUser{} , false
  } 

  // if time.Since(user.CreatedAt) >= (15 * time.Minute) {
  //   CacheUserStore.Delete(emailID)
  //   return authtypes.CacheUser{}, false
  // }
  return user , true
}


//cacheRefresh refreshes the cache storage 
// func cacheRefresh() {
//
//   CacheUserStore.Range(func(key , value interface{}) bool {
//     //Type assertions to convert interface{} to authtypes.CacheUser
//     user,ok := value.(authtypes.CacheUser)
//     if ok {
//       if time.Since(user.CreatedAt) >= (15 * time.Minute) {
//         CacheUserStore.Delete(user.Email)
//       }
//       CacheUserStore.Delete(user.Email)
//     }
//
//     return true //continue iteration
//   })
// }
//

func deleteUserFromCache(email string) {
  if _,ok := CacheUserStore.Load(email); ok {
    CacheUserStore.Delete(email)
  }
}

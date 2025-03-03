package auth

import "golang.org/x/crypto/bcrypt"

/*generate hashed password using crypto/bcrypt with a cost, the cost parameter in bcrypt defines the computational complexity of hashing password. 
It controls the number of iterations used in the hashing process, making it more difficult for attackers to brute-force passwords by increasing the time required to compute each hush. 
The cost is an integer between 4 and 31, it determines the number of key expansion iterations as 2cost . 
Higher Cost: More secure but slower to hash and verify password. 

  For example:
      cost = 10 -> 2^10 = 1024 iterations
      cost = 12 -> 2^12 = 4096 iterations
      cost = 14 -> 2^14 = 16,384 iterations */
func hash_Password( password string , cost int , hashed_password chan string){

  hashed,err := bcrypt.GenerateFromPassword([]byte(password) , cost)
  if err != nil {
    hashed_password <- ""
  }
  hashed_password <- string(hashed)
}



package authtypes

import "time"

type CacheUser struct {
	Username        string    `json:"username"`
	Email           string    `json:"email"`
	Hashed_password string    `json:"hashed_password"`
	CreatedAt       time.Time `json:"created_at"`
}

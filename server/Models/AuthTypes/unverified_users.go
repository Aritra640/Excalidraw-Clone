package authtypes

type CacheUser struct {
	Username        string `json:"username"`
	Email           string `json:"email"`
	Hashed_Password string `json:"hashed_password"`
}

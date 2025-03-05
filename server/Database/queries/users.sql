-- name: AddUser :one
INSERT INTO users (username, email, password_hashed)
VALUES ($1, $2, $3)
RETURNING id, username, email, password_hashed, created_at;

-- name: DeleteUserByID :exec
DELETE FROM users WHERE id = $1;

-- name: GetUserByID :one
SELECT id, username, email, password_hashed, created_at
FROM users
WHERE id = $1;

-- name: GetUserByUsername :one
SELECT id, username, email, password_hashed, created_at
FROM users
WHERE username = $1;

-- name: ListUsers :many
SELECT id, username, email, created_at
FROM users
ORDER BY created_at DESC;

-- name: GetUserByEmail :one
SELECT id, username, email, password_hashed, created_at 
FROM users
WHERE email = $1;

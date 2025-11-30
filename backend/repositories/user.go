package repositories

import (
	"time"

	"github.com/hsk-kr/ratecode/backend/db"
	"github.com/jackc/pgx/v5"
)

type User struct {
	Id           int
	Email        string
	AuthProvider string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func GetUserAndCreateIfNotExist(email, authProvider string) (*User, error) {
	var user User
	ctx, cancel := db.GetDBContext()
	defer cancel()

	conn, err := db.Open()
	if err != nil {
		return nil, err
	}

	tx, err := conn.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	err = tx.QueryRow(ctx,
		`SELECT id, email, auth_provider, created_at, updated_at
         FROM users
         WHERE email = $1 AND auth_provider = $2`,
		email, authProvider,
	).Scan(
		&user.Id,
		&user.Email,
		&user.AuthProvider,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == nil {
		return &user, nil
	}

	if err != pgx.ErrNoRows {
		return nil, err
	}

	err = tx.QueryRow(ctx,
		`INSERT INTO users (email, auth_provider)
         VALUES ($1, $2)
         RETURNING id, email, auth_provider, created_at, updated_at`,
		email, authProvider,
	).Scan(
		&user.Id,
		&user.Email,
		&user.AuthProvider,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	tx.Commit(ctx)

	return &user, nil
}

package db

import (
	"log"
)

func createTable(query string) {
	ctx, cancel := GetDBContext()
	defer cancel()
	conn, err := Open()

	if err != nil {
		log.Fatalf("Unable to connect db: %v\n", err)
	}

	_, err = conn.Exec(ctx, query)

	if err != nil {
		log.Fatalf("Failed to create users table: %v\n", err)
	}
}

func users() {
	createTable(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    auth_provider TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (email, auth_provider)
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_auth_provider ON users (auth_provider);
		`)
}

func CreateTables() {
	users()
}

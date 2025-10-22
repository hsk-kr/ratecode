package db

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/jackc/pgx/v5"
)

func CreateDatabase() {
	ctx, cancel := GetDBContext()
	defer cancel()

	databaseUrl := os.Getenv("DATABASE_URL")
	databaseUrlWithoutDb := databaseUrl[:strings.LastIndex(databaseUrl, "/")]

	conn, err := pgx.Connect(ctx, databaseUrlWithoutDb)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(ctx)

	dbName := os.Getenv("DB_NAME")
	row := conn.QueryRow(ctx, fmt.Sprintf("SELECT EXISTS (SELECT FROM pg_database WHERE datname = '%s')", dbName))

	var exists bool
	err = row.Scan(&exists)
	if err != nil {
		log.Fatalf("Query Failed: %v\n", err)
	}

	if !exists {
		_, err := conn.Exec(ctx, fmt.Sprintf("CREATE DATABASE %s", dbName))
		if err != nil {
			log.Fatalf("Failed to create database: %v\n", err)
		}
	}
}

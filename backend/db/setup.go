package db

import (
	"log"
	"os"
)

// todo: migration table and logic are needed here

func Init() {
	sql, err := os.ReadFile("/app/backend/db/sql/init.sql")
	if err != nil {
		log.Fatal("failed to read SQL file:", err)
	}

	ctx, cancel := GetDBContext()
	defer cancel()
	conn, err := Open()

	if err != nil {
		log.Fatalf("Unable to connect db: %v\n", err)
	}

	_, err = conn.Exec(ctx, string(sql))

	if err != nil {
		log.Fatalf("Failed to initialize database: %v\n", err)
	}
}

func Setup() {
	CreateDatabase()
	Init()

	log.Println("Completed DB Setup")
}

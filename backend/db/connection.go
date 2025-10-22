package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func GetDBContext() (context.Context, context.CancelFunc) {
	timeout := os.Getenv("DB_TIMEOUT")
	nTimeout, err := strconv.Atoi(timeout)

	if err != nil {
		log.Fatal("Failed to load DB_TIMEOUT env")
	}

	return context.WithTimeout(context.Background(), time.Duration(nTimeout)*time.Millisecond)
}

func Open() (*pgxpool.Pool, error) {
	ctx, cancel := GetDBContext()
	defer cancel()

	dbpool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		return nil, err
	}

	return dbpool, nil
}

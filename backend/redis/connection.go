package redis

import (
	"context"
	"os"

	"github.com/redis/go-redis/v9"
)

func GetRedisClient() (*redis.Client, context.Context) {
	redisAddr := os.Getenv("REDIS_ADDR")
	rdb := redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: "",
		DB:       0,
		Protocol: 2,
	})

	ctx := context.Background()

	return rdb, ctx
}

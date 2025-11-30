package redis

import (
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

func StoreOAuthState(state string) error {
	rdb, ctx := GetRedisClient()

	return rdb.Set(ctx, fmt.Sprintf("oauth:state:%s", state), "ok", time.Minute*1).Err()
}

func CheckAndDeleteOAuthState(state string) (bool, error) {
	rdb, ctx := GetRedisClient()

	key := fmt.Sprintf("oauth:state:%s", state)

	_, err := rdb.Get(ctx, key).Result()

	if err == redis.Nil {
		return false, nil
	}

	if err != nil {
		return false, err
	}

	_, err = rdb.Del(ctx, key).Result()
	if err != nil {
		return false, err
	}

	return true, nil
}

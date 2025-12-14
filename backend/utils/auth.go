package utils

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type AccessToken struct {
	Sub   int    `json:"sub"`
	Email string `json:"email"`
}

func GenerateJWT(userID int, email string) (string, error) {
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   userID,
		"email": email,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
		"iat":   time.Now().Unix(),
	})

	return token.SignedString([]byte(jwtSecret))
}

func VerifyJWT(tokenString string) (*AccessToken, error) {
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		if token.Method != jwt.SigningMethodHS256 {
			return nil, fmt.Errorf("invalid signing method")
		}

		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		accessToken := new(AccessToken)

		accessToken.Sub = int(claims["sub"].(float64))
		accessToken.Email = claims["email"].(string)

		return accessToken, nil
	}

	return nil, fmt.Errorf("invalid token")
}

func GetUserIdFromContext(ctx context.Context) int {
	userId, _ := ctx.Value(CtxUserIdKey{}).(int)
	return userId
}

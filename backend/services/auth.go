package services

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"os"

	"github.com/hsk-kr/ratecode/backend/redis"
	"github.com/hsk-kr/ratecode/backend/repositories"
	"github.com/hsk-kr/ratecode/backend/utils"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type LoginResponse struct {
	AccessToken string `json:"accessToken"`
}

var oauthConfig *oauth2.Config

func GetOAuthConfig() *oauth2.Config {
	if oauthConfig == nil {
		clientId := os.Getenv("GOOGLE_CLIENT_ID")
		clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
		callbackUrl := os.Getenv("GOOGLE_CALLBACK_URL")

		oauthConfig = &oauth2.Config{
			ClientID:     clientId,
			ClientSecret: clientSecret,
			RedirectURL:  callbackUrl,
			Scopes: []string{
				"https://www.googleapis.com/auth/userinfo.email",
			},
			Endpoint: google.Endpoint,
		}
	}

	return oauthConfig
}

func generateState() string {
	b := make([]byte, 32)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)
}

func GetOAuthUrl() string {
	state := generateState()
	oauthConfig = GetOAuthConfig()

	redis.StoreOAuthState(state)

	return oauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
}

func Login(code string) (*LoginResponse, error) {
	token, err := GetOAuthConfig().Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("Invalid Token")
	}

	client := GetOAuthConfig().Client(context.Background(), token)

	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo?fields=email")
	if err != nil {
		return nil, fmt.Errorf("Failed to fetch email")
	}
	defer resp.Body.Close()

	var data struct {
		Email string `json:"email"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("Failed to parse email")
	}

	user, err := repositories.GetUserAndCreateIfNotExist(data.Email, "google")

	if err != nil {
		return nil, err
	}

	accessToken, err := utils.GenerateJWT(user.Id, user.Email)

	if err != nil {
		return nil, err
	}

	return &LoginResponse{
		AccessToken: accessToken,
	}, nil
}

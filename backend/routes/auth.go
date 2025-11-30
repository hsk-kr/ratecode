package routes

import (
	"fmt"
	"net/http"
	"os"

	"github.com/hsk-kr/ratecode/backend/redis"
	"github.com/hsk-kr/ratecode/backend/services"
)

type OAuthUrlResponse struct {
	OAuthUrl string `json:"oauthUrl"`
}

func HandleOAuthUrl(w http.ResponseWriter, r *http.Request) {
	oauthUrl := services.GetOAuthUrl()

	JsonResponse(w, OAuthUrlResponse{
		OAuthUrl: oauthUrl,
	})
}

func HandleOAuthCallback(w http.ResponseWriter, r *http.Request) {
	state := r.URL.Query().Get("state")
	code := r.URL.Query().Get("code")

	if state == "" || code == "" {
		http.Error(w, "Missing state or code", http.StatusBadRequest)
		return
	}

	ok, err := redis.CheckAndDeleteOAuthState(state)
	if err != nil || !ok {
		http.Error(w, "Invalid state", http.StatusUnauthorized)
		return
	}

	res, err := services.Login(code)

	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	loginCallbackUrl := os.Getenv("FRONTEND_LOGIN_CALLBACK_URL")

	http.Redirect(w, r, fmt.Sprintf("%s?accessToken=%s", loginCallbackUrl, res.AccessToken), http.StatusFound)
}

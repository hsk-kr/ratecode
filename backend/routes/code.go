package routes

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/hsk-kr/ratecode/backend/repositories"
	"github.com/hsk-kr/ratecode/backend/utils"
)

type CreateCodeParam struct {
	Code     string `json:"code"`
	Language string `json:"language"`
}

type CreateCodeResponse struct {
	Uuid string `json:"uuid"`
}

type RandomCodeResponse = CreateCodeResponse

func HandleGetCode(w http.ResponseWriter, r *http.Request) {
	path := strings.Trim(r.URL.Path, "/codes")
	parts := strings.Split(path, "/")

	if len(parts) != 1 {
		NotFound(w)
		return
	}

	uuid := parts[0]

	code, err := repositories.GetCode(uuid)

	if err != nil {
		NotFound(w)
		return
	}

	JsonResponse(w, code)
}

func HandleGetRandomCode(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	uuid, err := repositories.GetRandomCodeUuid()

	if err != nil {
		BadRequest(w)
		return
	}

	JsonResponse(w, RandomCodeResponse{
		Uuid: uuid,
	})
}

func HandleCreateCode(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	userId := utils.GetUserIdFromContext(r.Context())

	var body CreateCodeParam
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		BadRequest(w)
		return
	}

	if len(body.Code) > 10000 || !utils.IsSupportedLanguage(body.Language) {
		BadRequest(w)
		return
	}

	uuid, err := repositories.CreateCode(userId, body.Code, body.Language)

	if err != nil {
		BadRequest(w)
		return
	}

	JsonResponse(w, CreateCodeResponse{
		Uuid: uuid,
	})
}

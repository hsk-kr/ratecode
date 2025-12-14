package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

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

func GetCodes(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Get Codes")
}

func GetCode(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Get Code")
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
		fmt.Println(err)
		BadRequest(w)
		return
	}

	JsonResponse(w, CreateCodeResponse{
		Uuid: uuid,
	})
}

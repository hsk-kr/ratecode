package routes

import (
	"encoding/json"
	"net/http"
)

func JsonResponse[T any](w http.ResponseWriter, respData T) {
	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(respData); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func BadRequest(w http.ResponseWriter) {
	http.Error(w, "Bad request", http.StatusBadRequest)
}

func NotFound(w http.ResponseWriter) {
	http.Error(w, "Not Found", http.StatusNotFound)
}

func Unauthorized(w http.ResponseWriter) {
	http.Error(w, "Unauthorized", http.StatusUnauthorized)
}

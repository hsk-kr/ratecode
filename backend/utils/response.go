package utils

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

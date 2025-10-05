package utils

import (
	"encoding/json"
	"net/http"
)

func GetBody[T any](w http.ResponseWriter, r *http.Request) (*T, bool) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Content-Type must be application/json", http.StatusUnsupportedMediaType)
		return nil, false
	}

	var data T
	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return nil, false
	}

	return &data, true
}

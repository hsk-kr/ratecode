package web

import (
	"net/http"
)

func CreateServer() *http.ServeMux {
	mux := http.NewServeMux()
	return mux
}

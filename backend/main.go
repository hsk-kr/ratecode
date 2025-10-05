package main

import (
	"net/http"

	"github.com/hsk-kr/ratecode/backend/routes"
	"github.com/hsk-kr/ratecode/backend/web"
)

func NewServer() http.Handler {
	//test
	mux := http.NewServeMux()
	mux.HandleFunc("GET /ping", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("pong"))
	})
	// all your routes go here
	return mux
}

func main() {
	mux := web.CreateServer()
	router := routes.GetRouter()
	router.Register(mux)
	http.ListenAndServe(":8080", mux)
}

package routes

import (
	"net/http"
)

func LoadRoutes(mux *http.ServeMux) {
	router := Router{}

	router.Create("/codes")
	router.Handle("GET", "/", GetCodes)
	router.Handle("GET", "/{code}", GetCode)
	router.Handle("POST", "/", CreateCode)

	router.Register(mux)
}

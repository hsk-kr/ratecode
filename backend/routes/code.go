package routes

import (
	"fmt"
	"net/http"
)

func GetCodes(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Get Codes")
}

func GetCode(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Get Code")
}

func CreateCode(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Create Code")
}

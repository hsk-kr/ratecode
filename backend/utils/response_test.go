package utils

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

type ResponseExample struct {
	Username string `json:"username"`
	Age      int    `json:"age"`
}

func TestJsonResponse(t *testing.T) {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		response := ResponseExample{Username: "han", Age: 10}
		JsonResponse(w, response)
	})
	server := httptest.NewServer(mux)
	defer server.Close()

	resp, err := http.Get(server.URL + "/")
	assert.NoError(t, err)

	defer resp.Body.Close()
	assert.Equal(t, http.StatusOK, resp.StatusCode)

	responseExample := ResponseExample{}

	json.NewDecoder(resp.Body).Decode(&responseExample)
	assert.Equal(t, "han", responseExample.Username)
	assert.Equal(t, 10, responseExample.Age)
}

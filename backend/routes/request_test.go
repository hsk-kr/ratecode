package routes

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

type BodyExample struct {
	Username string `json:"username"`
	Age      int    `json:"age"`
}

func TestGetBodySuccess(t *testing.T) {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		body, success := GetBody[BodyExample](w, r)

		assert.Equal(t, "han", body.Username)
		assert.Equal(t, 10, body.Age)
		assert.Equal(t, true, success)
	})
	server := httptest.NewServer(mux)
	defer server.Close()

	bodyExample := BodyExample{Username: "han", Age: 10}
	body, err := json.Marshal(bodyExample)
	assert.NoError(t, err)

	resp, err := http.Post(server.URL+"/", "application/json", bytes.NewBuffer(body))
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)
}

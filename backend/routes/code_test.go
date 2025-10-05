package routes

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetCodes(t *testing.T) {
	context := TestContext{}
	context.setup(t)
	defer context.teardown()

	resp, err := http.Get(context.getUrl("/codes"))

	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, resp.StatusCode, 200, "should success")

	defer resp.Body.Close()
}

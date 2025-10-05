package routes

import (
	"fmt"
	"net/http/httptest"
	"testing"

	"github.com/hsk-kr/ratecode/backend/web"
)

type TestContext struct {
	t      *testing.T
	server *httptest.Server
	getUrl func(pathname string) string
}

func (tc *TestContext) setup(t *testing.T) {
	mux := web.CreateServer()
	LoadRoutes(mux)

	server := httptest.NewServer(mux)

	tc.t = t
	tc.server = server
	tc.getUrl = func(pathname string) string {
		return server.URL + pathname
	}
}

func (tc *TestContext) teardown() {
	if tc.t == nil {
		panic(fmt.Errorf("setup must be called\n"))
	}

	tc.server.Close()
}

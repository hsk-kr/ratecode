package routes

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/hsk-kr/ratecode/backend/utils"
)

type endpoint struct {
	handler func(w http.ResponseWriter, r *http.Request)
	method  string
}

type EndpointOptions struct {
	AuthNeed bool
}

type Router struct {
	endpoints  map[string][]endpoint
	pathPrefix string
}

func (r *Router) Create(prefix string) {
	r.pathPrefix = prefix
}

func (r *Router) Handle(method, path string, handler func(w http.ResponseWriter, r *http.Request), options EndpointOptions) {
	if r.endpoints == nil {
		r.endpoints = make(map[string][]endpoint)
	}

	_, ok := r.endpoints[path]
	if !ok {
		r.endpoints[path] = make([]endpoint, 1)
	}

	newHandler := func(w http.ResponseWriter, req *http.Request) {
		if !options.AuthNeed {
			handler(w, req)
			return
		}

		authorization := req.Header.Get("Authorization")

		if authorization == "" {
			Unauthorized(w)
			return
		}

		tokens := strings.Split(authorization, " ")
		accessToken, err := utils.VerifyJWT(tokens[1])

		if err != nil {
			Unauthorized(w)
			return
		}

		ctx := context.WithValue(req.Context(), utils.CtxUserIdKey{}, accessToken.Sub)
		handler(w, req.WithContext(ctx))
	}

	r.endpoints[path] = append(r.endpoints[path], endpoint{handler: newHandler, method: method})
}

func (r *Router) Register(mux *http.ServeMux) {
	if r.endpoints == nil {
		return
	}

	for subendpointPath, subendpoints := range r.endpoints {
		apiPath := r.pathPrefix + subendpointPath
		fmt.Println(apiPath)

		mux.HandleFunc(apiPath, func(w http.ResponseWriter, r *http.Request) {
			for _, subendpoint := range subendpoints {
				fmt.Println(subendpoint)
				if strings.EqualFold(subendpoint.method, r.Method) {

					subendpoint.handler(w, r)
					return
				}
			}

			w.WriteHeader(http.StatusMethodNotAllowed)
			fmt.Fprint(w, "Method Not Allowed")
		})
	}
}

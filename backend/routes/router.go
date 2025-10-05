package routes

import (
	"fmt"
	"net/http"
	"path"
	"strings"
)

type endpoint struct {
	handler func(w http.ResponseWriter, r *http.Request)
	method  string
}

type Router struct {
	endpoints  map[string][]endpoint
	pathPrefix string
}

func (r *Router) Create(prefix string) {
	r.pathPrefix = prefix
}

func (r *Router) Handle(method, path string, handler func(w http.ResponseWriter, r *http.Request)) {
	if r.endpoints == nil {
		r.endpoints = make(map[string][]endpoint)
	}

	_, ok := r.endpoints[path]
	if !ok {
		r.endpoints[path] = make([]endpoint, 1)
	}

	r.endpoints[path] = append(r.endpoints[path], endpoint{handler: handler, method: method})
}

func (r *Router) Register(mux *http.ServeMux) {
	if r.endpoints == nil {
		return
	}

	for subendpointPath, subendpoints := range r.endpoints {
		apiPath := path.Join(r.pathPrefix, subendpointPath)

		mux.HandleFunc(apiPath, func(w http.ResponseWriter, r *http.Request) {
			for _, subendpoint := range subendpoints {
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

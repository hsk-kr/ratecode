package routes

func GetRouter() *Router {
	router := &Router{}

	router.Create("/codes")
	router.Handle("GET", "/", GetCodes)
	router.Handle("GET", "/{code}", GetCode)
	router.Handle("POST", "/", CreateCode)

	return router
}

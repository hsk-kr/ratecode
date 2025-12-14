package routes

func GetRouters() []*Router {
	codeRouter := &Router{}

	codeRouter.Create("/codes", true)
	codeRouter.Handle("GET", "/", GetCodes)
	codeRouter.Handle("GET", "/{code}", GetCode)
	codeRouter.Handle("POST", "/", HandleCreateCode)

	authRouter := &Router{}
	authRouter.Create("/auth", false)
	authRouter.Handle("GET", "/google/callback", HandleOAuthCallback)
	authRouter.Handle("GET", "/url", HandleOAuthUrl)

	return []*Router{codeRouter, authRouter}
}

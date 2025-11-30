package routes

func GetRouters() []*Router {
	codeRouter := &Router{}

	codeRouter.Create("/codes")
	codeRouter.Handle("GET", "/", GetCodes)
	codeRouter.Handle("GET", "/{code}", GetCode)
	codeRouter.Handle("POST", "/", CreateCode)

	authRouter := &Router{}
	authRouter.Create("/auth")
	authRouter.Handle("GET", "/google/callback", HandleOAuthCallback)
	authRouter.Handle("GET", "/url", HandleOAuthUrl)

	return []*Router{codeRouter, authRouter}
}

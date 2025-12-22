package routes

func GetRouters() []*Router {
	codeRouter := &Router{}

	codeRouter.Create("/codes")
	codeRouter.Handle("POST", "", HandleCreateCode, EndpointOptions{
		AuthNeed: true,
	})
	codeRouter.Handle("GET", "/random", HandleGetRandomCode, EndpointOptions{})
	codeRouter.Handle("GET", "/", HandleGetCode, EndpointOptions{})

	authRouter := &Router{}
	authRouter.Create("/auth")
	authRouter.Handle("GET", "/google/callback", HandleOAuthCallback, EndpointOptions{})
	authRouter.Handle("GET", "/url", HandleOAuthUrl, EndpointOptions{})

	return []*Router{codeRouter, authRouter}
}

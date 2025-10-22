package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/hsk-kr/ratecode/backend/db"
	"github.com/hsk-kr/ratecode/backend/routes"
	"github.com/hsk-kr/ratecode/backend/web"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	loadEnv()

	mux := web.CreateServer()
	router := routes.GetRouter()
	router.Register(mux)

	handler := cors.Default().Handler(mux)

	port := os.Getenv("PORT")

	fmt.Printf("Listening :%s\n", port)
	db.Setup()
	db.Open()
	http.ListenAndServe(fmt.Sprintf(":%s", port), handler)

}

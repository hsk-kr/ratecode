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
	db.Setup()

	mux := web.CreateServer()
	router := routes.GetRouter()
	router.Register(mux)

	handler := cors.Default().Handler(mux)

	port := os.Getenv("PORT")

	log.Printf("Listening :%s\n", port)
	http.ListenAndServe(fmt.Sprintf(":%s", port), handler)

}

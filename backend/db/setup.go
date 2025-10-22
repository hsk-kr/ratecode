package db

import "log"

func Setup() {
	CreateDatabase()
	CreateTables()

	log.Println("Completed DB Setup")
}

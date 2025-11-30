package db

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

type Migration struct {
	Name string `json:"name"`
}

func Init() {
	ctx, cancel := GetDBContext()
	defer cancel()
	conn, err := Open()

	if err != nil {
		log.Fatalf("Unable to connect db: %v\n", err)
	}

	execSqlFile := func(sqlFileName string) {
		path := fmt.Sprintf("/app/backend/db/sql/%s", sqlFileName)
		sql, err := os.ReadFile(path)
		if err != nil {
			log.Fatalf("Failed to read SQL file: %v", err)
		}

		_, err = conn.Exec(ctx, string(sql))

		if err != nil {
			log.Fatalf("Failed to run SQL file: %v\n", err)
		}

		log.Printf("Executed %s", path)
	}

	execInitSql := func() {
		var exists bool

		err := conn.QueryRow(ctx, `
    	SELECT EXISTS (
    	    SELECT 1
    	    FROM information_schema.tables 
    	    WHERE table_schema = 'public'
    	    AND table_name = 'migrations'
    	)
		`).Scan(&exists)

		if err != nil {
			log.Fatalf("Failed to execute SQL: %v", err)
		}

		if exists {
			return
		}

		execSqlFile("init.sql")
	}

	migrate := func() {
		data, err := os.ReadFile("/app/backend/db/sql/journey.json")
		if err != nil {
			log.Fatalf("Failed to load migration data")
		}

		var migrations []Migration
		if err := json.Unmarshal(data, &migrations); err != nil {
			log.Fatalf("Failed to unmarshal migration data")
		}

		rows, err := conn.Query(ctx, "SELECT name FROM migrations order by id")
		if err != nil {
			log.Fatalf("Failed to select migrations table")
		}
		defer rows.Close()

		for _, migration := range migrations {
			exist := rows.Next()
			if exist {
				var name string
				if err := rows.Scan(&name); err != nil {
					log.Fatalf("Failed to get a row from migrations table")
				}

				if name != migration.Name {
					log.Fatalf("Migration names are different, %s from json, %s from database", migration.Name, name)
				}
			} else {
				execSqlFile(migration.Name)
				_, err = conn.Exec(ctx, "INSERT INTO migrations(name) VALUES($1)", migration.Name)
				if err != nil {
					log.Fatalf("Failed to insert a migration, %v", err)
				}
			}
		}
	}

	execInitSql()
	migrate()
}

func Setup() {
	CreateDatabase()
	Init()

	log.Println("Completed DB Setup")
}

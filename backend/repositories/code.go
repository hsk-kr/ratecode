package repositories

import (
	"context"
	"fmt"
	"time"

	"github.com/hsk-kr/ratecode/backend/db"
	"github.com/hsk-kr/ratecode/backend/utils"
	"github.com/jackc/pgx/v5"
)

type Code struct {
	Id         int
	Uuid       string
	userId     int
	code       string
	language   string
	created_at time.Time
}

// returns created code's uuid
func CreateCode(userId int, code, language string) (string, error) {
	return db.WithTransaction(func(tx pgx.Tx, ctx context.Context) (string, error) {
		retry := true
		var uuid string

		for retry {
			uuid = utils.GenerateCodeUuid(language)

			err := tx.QueryRow(ctx,
				`INSERT INTO codes (uuid, user_id, code, language)
         VALUES ($1, $2, $3, $4)
				ON CONFLICT (uuid) DO NOTHING
         RETURNING uuid`,
				uuid,
				userId,
				code,
				language,
			).Scan(
				&uuid,
			)

			if err == pgx.ErrNoRows {
				continue
			}

			retry = false

			if err != nil {
				return "", err
			}
		}

		return uuid, nil
	})
}

func DeleteCode(uuid string) (bool, error) {
	return db.WithTransaction(func(tx pgx.Tx, ctx context.Context) (bool, error) {
		cmd, err := tx.Exec(ctx,
			`DELETE FROM code WHERE uuid = $1`,
			uuid,
		)

		if cmd.RowsAffected() != 1 {
			return false, fmt.Errorf("%d rows affected. It must be 1.", cmd.RowsAffected())
		}

		if err != nil {
			return false, err
		}

		return true, nil
	})
}

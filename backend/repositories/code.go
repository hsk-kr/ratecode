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
	Uuid      string    `json:"uuid"`
	Code      string    `json:"code"`
	Language  string    `json:"language"`
	CreatedAt time.Time `json:"createdAt"`
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

func GetRandomCodeUuid() (string, error) {
	return db.WithTransaction(func(tx pgx.Tx, ctx context.Context) (string, error) {
		var uuid string

		err := tx.QueryRow(ctx,
			"SELECT uuid FROM codes ORDER BY random() LIMIT 1",
		).Scan(&uuid)

		return uuid, err
	})
}

func GetCode(uuid string) (*Code, error) {
	return db.WithTransaction(func(tx pgx.Tx, ctx context.Context) (*Code, error) {
		var code Code

		err := tx.QueryRow(ctx,
			"SELECT uuid, code, language, created_at FROM codes where uuid = $1",
			uuid,
		).Scan(&code.Uuid, &code.Code, &code.Language, &code.CreatedAt)

		return &code, err
	})
}

ALTER TABLE codes ADD COLUMN views INTEGER NOT NULL DEFAULT 0;

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code_id INTEGER NOT NULL REFERENCES codes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE code_saves (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code_id INTEGER NOT NULL REFERENCES codes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ratings_user_id ON ratings(user_id);

CREATE INDEX idx_ratings_code_id  ON ratings(code_id);

CREATE INDEX idx_code_saves_user_id  ON ratings(user_id);

CREATE INDEX idx_code_saves_code_id  ON ratings(code_id);

CREATE UNIQUE INDEX idx_unique_rating ON ratings (user_id, code_id);

CREATE UNIQUE INDEX idx_unique_save ON code_saves (user_id, code_id);

CREATE TABLE migrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(name)
);

CREATE INDEX idx_migrations_name ON migrations (name);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    auth_provider TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (email, auth_provider)
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_auth_provider ON users (auth_provider);

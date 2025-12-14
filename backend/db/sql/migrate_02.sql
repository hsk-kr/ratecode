CREATE INDEX idx_codes_user_id ON codes(user_id);

ALTER TABLE codes ALTER COLUMN uuid TYPE TEXT;

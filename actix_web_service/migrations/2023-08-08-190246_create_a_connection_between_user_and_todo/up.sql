-- Your SQL goes here
ALTER TABLE todos
    ADD COLUMN user_id VARCHAR(255);

ALTER TABLE todos
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);
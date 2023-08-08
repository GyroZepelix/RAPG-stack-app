-- Your SQL goes here
ALTER TABLE todos
    ADD COLUMN user_id VARCHAR(255) NOT NULL DEFAULT '823dae9f-aaa6-4f51-b3a6-b4c6526a79b4';

ALTER TABLE todos
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);

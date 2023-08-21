-- Your SQL goes here
CREATE TABLE users
(
    id         VARCHAR(255) PRIMARY KEY,
    username   VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    created_at TIMESTAMP
);

INSERT INTO users (id, username, email, created_at)
VALUES ('823dae9f-aaa6-4f51-b3a6-b4c6526a79b4', 'Boban', 'boban@gmail.com', '2019-01-01 00:00:00');
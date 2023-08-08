-- This file should undo anything in `up.sql`
ALTER TABLE todos
    DROP CONSTRAINT fk_user;

ALTER TABLE todos
    DROP COLUMN user_id;

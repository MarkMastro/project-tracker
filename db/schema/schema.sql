DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS bugs CASCADE;
DROP TABLE IF EXISTS projects CASCADE;


-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS users
(
    "id" SERIAL PRIMARY KEY,
    "name" CHAR (40),
    "email" VARCHAR (256) NOT NULL,
    "password" VARCHAR (256) NOT NULL
);

--user_id is the project owner
CREATE TABLE IF NOT EXISTS projects
(
    "id" SERIAL PRIMARY KEY,
    "project_name" VARCHAR(100) NOT NULL,
    "user_id" INTEGER REFERENCES users (id) ON DELETE CASCADE

);
--user_id is the story owner

CREATE TABLE IF NOT EXISTS stories
(
    "id" SERIAL PRIMARY KEY,
    "story_name" VARCHAR(100) NOT NULL,
    "story_description" VARCHAR (256) NOT NULL,
    "user_id"  INTEGER REFERENCES users (id) ON DELETE CASCADE
);
--user_id is the bug creator, project_id is the project the bug belongs to

CREATE TABLE IF NOT EXISTS bugs
(
    "id" SERIAL PRIMARY KEY,
    "bug_name" VARCHAR(100) NOT NULL,
    "bug_description" VARCHAR (256) NOT NULL,
    "user_id" INTEGER REFERENCES users (id) ON DELETE CASCADE,
    "project_id" INTEGER REFERENCES projects (id) ON DELETE CASCADE
);


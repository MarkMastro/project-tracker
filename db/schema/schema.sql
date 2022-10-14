DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS bugs CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;


-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS users
(
    "id" SERIAL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "position" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

--user_id is the project owner
CREATE TABLE IF NOT EXISTS projects
(
    "id" SERIAL PRIMARY KEY,
    "project_name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_on" DATE,  
    "owner_user_id" INTEGER REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tickets
(
    "id" SERIAL PRIMARY KEY,
    "type" TEXT,
    "ticket_name" VARCHAR(100) NOT NULL,
    "ticket_description" VARCHAR (256) NOT NULL,
    "project_id" INTEGER REFERENCES projects (id) ON DELETE CASCADE,
    "raised_by_user_id"  INTEGER REFERENCES users (id) ON DELETE CASCADE,
    "assigned_to_user_id"  INTEGER REFERENCES users (id) ON DELETE CASCADE,
    "created_on" DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS ticket_comments
(
    "id" SERIAL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "user_id" INTEGER REFERENCES users (id) ON DELETE CASCADE,
    "ticket_id" INTEGER REFERENCES tickets (id) ON DELETE CASCADE,
    "created_on" DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS project_members
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES users (id) ON DELETE CASCADE,
    "project_id" INTEGER REFERENCES projects (id) ON DELETE CASCADE
);


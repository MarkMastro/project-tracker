-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS project_tracker;

-- Create the db
CREATE DATABASE project_tracker;

-- Move into the db
\c project_tracker

-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS users
(
    "id" SERIAL PRIMARY KEY,
    "name" CHAR (40),
    "email" VARCHAR (256) NOT NULL,
    "password" VARCHAR (256) NOT NULL
);
CREATE TABLE IF NOT EXISTS projects
(
    "id" SERIAL PRIMARY KEY,
    "project_name" VARCHAR(100) NOT NULL,
    "owner_id" INTEGER REFERENCES users (id) ON DELETE CASCADE

);
CREATE TABLE IF NOT EXISTS stories
(
    "id" SERIAL PRIMARY KEY,
    "story_name" VARCHAR(100) NOT NULL,
    "story_description" VARCHAR (256) NOT NULL,
    "storyOwner_id"  INTEGER REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bugs
(
    "id" SERIAL PRIMARY KEY,
    "bug_name" VARCHAR(100) NOT NULL,
    "bug_description" VARCHAR (256) NOT NULL,
    "bugCreator_id" INTEGER REFERENCES users (id) ON DELETE CASCADE
);


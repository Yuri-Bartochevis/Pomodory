CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE config (
    id  uuid default uuid_generate_v4() not null,
    email    varchar(100),
    duration numeric,
    shortBreak numeric,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT CONFIG_EMAIL_UNQ unique (email)
);


CREATE TABLE daily_log (
    email    varchar(100),
    duration numeric,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

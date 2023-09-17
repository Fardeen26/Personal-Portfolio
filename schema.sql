CREATE TABLE webusers (
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    message VARCHAR(1000)
);
CREATE TABLE contacts(
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    patronymic VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    createdAt VARCHAR(255),
    updatedAt VARCHAR(255)
);

CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    shortName VARCHAR(255),
    businessEntity VARCHAR(255),
    contract json,
    type VARCHAR(255)[],
    status VARCHAR(255),
    address VARCHAR(255),
    createdAt VARCHAR(255),
    updatedAt VARCHAR(255),
    contactId INTEGER,
    FOREIGN KEY (contactId) REFERENCES contacts (id)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

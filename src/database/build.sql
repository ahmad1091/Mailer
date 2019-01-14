BEGIN ;
DROP TABLE IF EXISTS users,messages;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE,
pass VARCHAR(100) NOT NULL
);

CREATE TABLE messages (
id SERIAL PRIMARY KEY,
user_id INTEGER,
message VARCHAR(500),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

insert into users (email,pass) values
('ahmad1091@gmail.com' , '123'),
('tala@gmail.com' , '123');

insert into messages(user_id,message) values
(1,'hello tala this is ahmad,best'),
(2,'hello ahmad this is tala,best');

COMMIT;

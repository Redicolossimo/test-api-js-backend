create table users
(
    id       serial       not null
        constraint users_pkey
            primary key,
    name     varchar(255) not null,
    email    varchar(255) not null,
    password varchar(255) not null
);

alter table users
    owner to postgres;

INSERT INTO public.users (id, name, email, password) VALUES (6, 'vasya5', 'dannisan5@gmail.com', '$2b$10$kcXq6dgvgqVyZLp9nhUGj.phpxi31AE34FxexGHb9yFAFsjEA9.E.');
INSERT INTO public.users (id, name, email, password) VALUES (7, 'vasya6', 'dannisan6@gmail.com', '$2b$10$AHhuEhJAtxbTdcN88O48kOs3ZhzjtMvg45i.V0bo7E5t.4OeIodX6');
INSERT INTO public.users (id, name, email, password) VALUES (8, 'vasya', 'dannisan@gmail.com', '$2b$10$8M1aFp8JNXM7LyIW/bykresdi/WeaczRd7HS1e9HI0/iW3qIJCNna');
INSERT INTO public.users (id, name, email, password) VALUES (9, 'vasya1', 'dannisan1@gmail.com', '$2b$10$uXqwkkM4SponPJjMqA8Qn.Mq.R6C318nZFtlPaqJozQfNJYnwgrlu');
INSERT INTO public.users (id, name, email, password) VALUES (10, 'vasya2', 'dannisan2@gmail.com', '$2b$10$BrYLaUHAhchOBLILzo0Kq.B26h4fKlTxzP2PybD0MQ3qe4jrYXMI.');
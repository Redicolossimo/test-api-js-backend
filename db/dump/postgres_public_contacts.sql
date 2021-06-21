create table contacts
(
    id         serial not null
        constraint contacts_pkey
            primary key,
    lastname   varchar(255),
    firstname  varchar(255),
    patronymic varchar(255),
    phone      varchar(255),
    email      varchar(255),
    createdat  varchar(255),
    updatedat  varchar(255)
);

alter table contacts
    owner to postgres;

INSERT INTO public.contacts (id, lastname, firstname, patronymic, phone, email, createdat, updatedat) VALUES (1, 'Григорьев', 'Сергей', 'Петрович', '79162165588', 'grigoriev@funeral.com', '2020-11-21T08:03:26.589Z', '2020-11-23T09:30:00Z');
INSERT INTO public.contacts (id, lastname, firstname, patronymic, phone, email, createdat, updatedat) VALUES (2, 'Моран', 'Адам', 'Томас', '792345665588', 'atm@funeral.com', '2020-11-21T08:03:26.589Z', '2021-06-20T18:15:33.891+07:00');
INSERT INTO public.contacts (id, lastname, firstname, patronymic, phone, email, createdat, updatedat) VALUES (3, 'Пупкин', 'Васисуалий', 'Акакиевич', '791645665588', 'pupkin@funeral.com', '2020-11-21T08:03:26.589Z', '2020-11-23T09:30:00Z');
INSERT INTO public.contacts (id, lastname, firstname, patronymic, phone, email, createdat, updatedat) VALUES (4, 'Однокамушкин', 'Алберт', 'Германович', '795445665588', 'eny@funeral.com', '2020-11-21T08:03:26.589Z', '2020-11-23T09:30:00Z');
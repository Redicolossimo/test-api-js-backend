create table companies
(
    id             serial not null
        constraint companies_pkey
            primary key,
    name           varchar(255),
    shortname      varchar(255),
    businessentity varchar(255),
    contract       json,
    type           varchar(255)[],
    status         varchar(255),
    address        varchar(255),
    createdat      varchar(255),
    updatedat      varchar(255),
    contactid      integer
        constraint companies_contactid_fkey
            references contacts
);

alter table companies
    owner to postgres;

INSERT INTO public.companies (id, name, shortname, businessentity, contract, type, status, address, createdat, updatedat, contactid) VALUES (1, 'ООО Фирма «Перспективные захоронения»', 'Перспективные захоронения', 'ООО', '{"no":"12345","issue_date":"2015-03-12T00:00:00Z"}', '{agent,contractor}', 'active', null, '2020-10-21T08:03:00Z', '2020-11-23T09:30:00Z', 1);
INSERT INTO public.companies (id, name, shortname, businessentity, contract, type, status, address, createdat, updatedat, contactid) VALUES (2, 'ООО Фирма «Рога и копыта»', 'Рога и копыта', 'ООО', '{"no":"54321","issue_date":"2015-03-12T00:00:00Z"}', '{agent}', 'active', null, '2021-11-21T08:03:00Z', '2020-11-23T09:30:00Z', 2);
INSERT INTO public.companies (id, name, shortname, businessentity, contract, type, status, address, createdat, updatedat, contactid) VALUES (3, 'ООО Фирма «Хинокридон»', 'Хинокридон', 'ООО', '{"no":"54321","issue_date":"2015-03-12T00:00:00Z"}', '{contractor}', 'not active', null, '2021-18-21T08:03:00Z', '2020-11-23T09:30:00Z', 3);
INSERT INTO public.companies (id, name, shortname, businessentity, contract, type, status, address, createdat, updatedat, contactid) VALUES (4, 'ООО Фирма «Пертуум»', 'Перпетуум', 'ООО', '{"no":"54321","issue_date":"2015-03-12T00:00:00Z"}', '{agent,contractor}', 'not active', null, '2020-11-21T08:03:00Z', '2020-11-23T09:30:00Z', 4);
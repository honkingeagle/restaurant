CREATE TABLE orders (
    id integer primary key autoincrement,
    name text not null,
    price integer not null,
    quantity integer not null,
    date text not null
);

CREATE TABLE menu (
    id integer primary key autoincrement,
    name text not null,
    price integer not null,
    date text not null
);
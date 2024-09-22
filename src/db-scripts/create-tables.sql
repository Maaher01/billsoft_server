create table categories(
	id serial primary key not null,
	categoryName varchar(128) not null,
	parentCategory INT
);

create table users (
	id serial primary key not null,
	fullName varchar(128) not null,
	password varchar(128) not null,
	role varchar(20) NOT NULL
);

create table entries (
	id serial primary key not null,
	year INT not null,
	month varchar(9) not null,
	amount numeric(10, 2) not null,
	categoryId INT not null,
	constraint fk_category foreign key(categoryId) references categories(id) on delete CASCADE
);
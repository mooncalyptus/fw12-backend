Active: 1669015944539@@127.0.0.1@5432@movietify@public
CREATE TABLE "users" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "users" ("picture","firstName","lastName","phoneNumber","email","password") VALUES ('https://picsum.photos/200/300','rania','zahara','0893829382','rania@mail.com','1234');
UPDATE "users" SET "firstName" = 'Jonas', "lastName" = 'El Rodriguez', "phoneNumber" = '+6281445687121', "email" = 'jonasrodrigu123@gmail.com' WHERE "id" = 1;

CREATE TABLE "resetPassword" (
"id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
"email" VARCHAR(255),
"userId" INT,
"code" VARCHAR(255),
"createdAt" TIMESTAMPTZ DEFAULT now(),
"updatedAt" TIMESTAMPTZ
);
INSERT into "resetPassword" ("email","userId","code") VALUES ('rania@mail.com',1,'4Af6');

CREATE TABLE "movies" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title" VARCHAR(255),
    "picture" VARCHAR(255),
    "releaseDate" TIMESTAMPTZ,
    "director" VARCHAR(255),
    "duration" TIMESTAMPTZ,
    "synopsis" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
ALTER TABLE "movies" ALTER COLUMN "duration" TYPE TIME;
SET timezone = 'Asia/Bangkok';
INSERT INTO "movies" ("title","picture","releaseDate","director","duration","synopsis") VALUES ('Castle in The Sky','https://picsum.photos/200/300',timestamp '2022/11/20 10:00:00','Hayao Miyazaki','02:04:00','Castle in the Sky (Japanese: 天空の城ラピュタ, Hepburn: Tenkuu no Shiro Laputa), titled Laputa: Castle in the Sky for release in the United Kingdom, Ireland, Australia and New Zealand, is a 1986 Japanese animated fantasy adventure film written and directed by Hayao Miyazaki.[1][2] The first film produced by Studio Ghibli, it was produced for Tokuma Shoten. Set in a fictional late 19th century, it follows the adventures of a boy and girl who are trying to keep a powerful crystal from the army, a group of secret agents, and a family of pirates, while searching for a legendary floating castle. The film was distributed by Toei Company.');
SHOW TIMEZONE;

CREATE TABLE "genre" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "genre" ("name") VALUES ('Fantasy');

CREATE TABLE "movieGenre"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId" INT,
    "genreId" INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "movieGenre" ("movieId","genreId") VALUES (1,1);

CREATE TABLE "casts"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "casts" ("name") VALUES ('Mayumi Tanaka');

CREATE TABLE "movieCasts"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "castsId" INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "movieCasts" ("castsId") VALUES (1);

CREATE TABLE "cinemas"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "address" VARCHAR(255),
    "city" VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "cinemas" ("name","address","city") VALUES ('HiFlix','Colonel street No. 2, East Purwokerto','Purwokerto');

CREATE TABLE "movieSchedule"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId" INT,
    "cinemasId" INT,
    "price" BIGINT,
    "startDate" TIMESTAMPTZ,
    "endDate" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "movieSchedule" ("movieId","cinemasId","price","startDate","endDate") VALUES (1,1,20000,'2022/11/18','2022/11/20');

CREATE TABLE "movieScheduleTime"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "time" TIMESTAMPTZ,
    "movieScheduleId" INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
ALTER TABLE "movieScheduleTime" ALTER COLUMN "time" TYPE TIME;
INSERT INTO "movieScheduleTime" ("time","movieScheduleId") VALUES ('10:00:00',1);

CREATE TABLE "transactions"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "bookingDate" TIMESTAMPTZ,
    "movieId" INT,
    "cinemasId" INT,
    "movieScheduleId" INT,
    "fullName" VARCHAR(255),
    "email" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "statusId" INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "transactions" ("bookingDate","movieId","cinemasId","movieScheduleId","fullName","email","phoneNumber","statusId") VALUES (timestamp '2022/11/19 10:00:00',1,1,1,'Jonas El Rodriguez','jonasrodri123@gmail.com','=6281445687121',1);

CREATE TABLE "status"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "status" ("name") VALUES ('Paid');

CREATE TABLE "reservedSeat"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "seatNum" VARCHAR(255),
    "transactionId" INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "reservedSeat" ("seatNum","transactionId") VALUES ('G5',1);

CREATE TABLE "paymentMethod"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "name" VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);
INSERT INTO "paymentMethod" ("picture","name") VALUES ('https://picsum.photos/200/300','Gopay');

CREATE TABLE "subsribers"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
)
INSERT INTO "subsribers" ("email") VALUES ('jonasrodri123@gmail.com');
ALTER TABLE "subsribers"
RENAME TO "subscribers";


ALTER TABLE "users" ADD CONSTRAINT "email" UNIQUE ("email");
ALTER TABLE "users" DROP CONSTRAINT "email";
ALTER TABLE "movies" ADD CONSTRAINT "title" UNIQUE ("title");
ALTER TABLE "genre" ADD CONSTRAINT "genreName" UNIQUE ("name");
ALTER TABLE "casts" ADD CONSTRAINT "castsName" UNIQUE ("name");
ALTER TABLE "cinemas" ADD CONSTRAINT "cinemaName" UNIQUE ("name");

ALTER TABLE "resetPassword" ADD CONSTRAINT "fk_userId" FOREIGN KEY ("userId") REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "resetPassword" DROP CONSTRAINT "fk_userId";

ALTER TABLE "movieGenre" DROP CONSTRAINT "fk_movieId";
ALTER TABLE "movieGenre" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "movieCasts" DROP CONSTRAINT "fk_castId";
ALTER TABLE "movieCasts" ADD CONSTRAINT "fk_castId" FOREIGN KEY ("castsId") REFERENCES casts (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "movieSchedule" DROP CONSTRAINT "fk_movieId";
ALTER TABLE "movieSchedule" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "movieSchedule" DROP CONSTRAINT "fk_cinemaId";
ALTER TABLE "movieSchedule" ADD CONSTRAINT "fk_cinemaId" FOREIGN KEY ("cinemasId") REFERENCES "cinemas" (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "movieScheduleTime" DROP CONSTRAINT "fk_movieScheduleId";
ALTER TABLE "movieScheduleTime" ADD CONSTRAINT "fk_movieScheduleId" FOREIGN KEY ("movieScheduleId") REFERENCES "movieSchedule" (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "transactions" DROP CONSTRAINT "fk_movieId";
ALTER TABLE "transactions" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "transactions" DROP CONSTRAINT "fk_cinemaId";
ALTER TABLE "transactions" ADD CONSTRAINT "fk_cinemaId" FOREIGN KEY ("cinemasId") REFERENCES cinemas (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "transactions" DROP CONSTRAINT "fk_movie_scheduleId";
ALTER TABLE "transactions" ADD CONSTRAINT "fk_movie_scheduleId" FOREIGN KEY ("movieScheduleId") REFERENCES "movieSchedule" (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "transactions" DROP CONSTRAINT "fk_statusId";
ALTER TABLE "transactions" ADD CONSTRAINT "fk_statusId" FOREIGN KEY ("statusId") REFERENCES "status" (id) ON UPDATE CASCADE ON DELETE CASCADE;

SELECT * FROM "resetPassword" JOIN "users" ON "users"."id" = "resetPassword"."id";
// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const morgan = require("morgan");
// eslint-disable-next-line no-undef
const cors = require("cors");
// eslint-disable-next-line no-undef
const passport = require("passport");

const app = express();

// middleware

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Подключаем morgan
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use("/Images", express.static("./Images"));
// Определение маршрутов и других настроек приложения...
//port

// eslint-disable-next-line no-undef
const UserRouter = require("./routers/UserRouter");
// eslint-disable-next-line no-undef
const SongRouter = require("./routers/SongRouter");
// eslint-disable-next-line no-undef
const BookRouter = require("./routers/BookRouter");
app.use("/api/users", UserRouter);
app.use("/api/songs", SongRouter);
app.use("/api/books", BookRouter);

app.use(passport.initialize());
// Слушаем порт
app.listen(8081, () => {
    console.log("Сервер запущен на порту 8081");
});
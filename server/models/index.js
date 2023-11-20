// eslint-disable-next-line no-undef
const dbConfig = require("../config/dbConfig.js");
// eslint-disable-next-line no-unused-vars,no-undef
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("connected..");
    })
    .catch(err => {
        console.log("Error" + err);
    });

// eslint-disable-next-line no-unused-vars
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// eslint-disable-next-line no-undef
db.users = require("./Users")(sequelize, DataTypes);
// eslint-disable-next-line no-undef
db.songs = require("./Songs")(sequelize, DataTypes);
// eslint-disable-next-line no-undef
db.books = require("./BookMark")(sequelize, DataTypes);
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("yes re-sync done!");
    });

db.users.hasMany(db.books, {
    foreignKey: "UserId",
    as: "books"
});

db.books.belongsTo(db.users, {
    foreignKey: "UserId",
    as: "bookstar"
});


db.songs.hasMany(db.books, {
    foreignKey: "SongId",
    as:"bookmarks"
});

db.books.belongsTo(db.songs, {
    foreignKey: "SongId",
    as: "songs"
});

// eslint-disable-next-line no-undef
module.exports = db;
// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
    const BookMark = sequelize.define("books", {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users", 
                key: "id",
            }
        },
        SongId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "songs", 
                key: "id",
            }
        },
    });
    return BookMark;
};
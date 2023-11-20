// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define("songs", {
        title:DataTypes.STRING,
        artist:DataTypes.STRING,
        genre:DataTypes.STRING,
        album:DataTypes.STRING,
        image:DataTypes.TEXT,
        youtubeId:DataTypes.STRING,
        lyrics: DataTypes.STRING,
        tab:DataTypes.STRING,
    });
    return Song;
};
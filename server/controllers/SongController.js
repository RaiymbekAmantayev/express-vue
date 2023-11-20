// eslint-disable-next-line no-undef
const db = require("../models");
// eslint-disable-next-line no-undef
const multer = require("multer");
// eslint-disable-next-line no-undef,no-unused-vars
const {path} = require("path");
// eslint-disable-next-line no-unused-vars
const Songs = db.songs;


const AddSongs = async (req, res) => {
    const { title, artist, genre, album, youtubeId, lyrics, tab } = req.body;
    const image = req.file.path;

    const song = {
        title,
        artist,
        genre,
        album,
        image,
        youtubeId,
        lyrics,
        tab,
    };

    try {
        const newSong = await Songs.create(song);
        res.send(newSong);
    } catch (err) {
        res.send(err);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            return cb(new Error("Only image files are allowed!"));
        }
        cb(null, Date.now() + "-" + file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Уберем кавычки, так как это число, а не строка
}).single("image");


// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line no-unused-vars
const GetAll = async (req, res)=>{
    const songs = await Songs.findAll({
        limit:10
    });
    res.send(songs);
};

const GetById = async(req, res)=>{
    const id = req.params.id;
    try{
        const song = await Songs.findByPk(id);
        res.send(song);
    }
    catch (err){
        res.send("Song not found ");
    }
};

const EditSong = async (req, res)=>{
    const id = req.params.id;
    const { title, artist, genre, album, youtubeId, lyrics, tab } = req.body;
    const image = req.file.path;
    const editedSong = {
        title,
        artist,
        genre,
        album,
        image,
        youtubeId,
        lyrics,
        tab,
    };
    try {
        const song = await Songs.update(editedSong, {where:{id:id}});
        res.send(song);
    }catch (err){
        res.send(err);
    }
};

const DeleteSong = async (req, res)=>{
    const id = req.params.id;
    await Songs.destroy({
        where: { id: id }
    });
    res.send("song deleted");
};


// eslint-disable-next-line no-undef
module.exports={
    AddSongs,
    GetAll,
    GetById,
    EditSong,
    DeleteSong,
    upload
};
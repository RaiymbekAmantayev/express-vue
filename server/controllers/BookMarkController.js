// eslint-disable-next-line no-undef
const db = require("../models");

// eslint-disable-next-line no-undef,no-unused-vars
const {path} = require("path");
// eslint-disable-next-line no-unused-vars
const Songs = db.songs;
// eslint-disable-next-line no-unused-vars
const Users = db.users;
const BookMark = db.books;

const GetAll = async(req, res)=>{
    try{
        const books = await BookMark.findAll(
            {
                where: { UserId:req.user.id },
                include: [
                    {
                        model: Songs,
                        as: "songs"
                    }
                ],
            });
        if(!books){
            res.status(400).send("user doesnt have bookmarks");
        }
        res.status(200).send(books);
    }catch (err){
        console.log(err);
    }
};
// eslint-disable-next-line no-unused-vars
const addBookMark = async (req, res) => {
    try {
        const userId = req.user.id;
        const songId = req.body.SongId;
        const bookmark = await BookMark.findAll({
            where: {
                SongId: songId,
                UserId: userId
            }
        });
        if (bookmark.length > 0) {
            return res.status(400).send("You already have that song bookmarked.");
        }
        const newBookMark = await BookMark.create({
            SongId: songId,
            UserId: userId
        });
        res.send(newBookMark);
    } catch (err) {
        console.log(err);
    }
};


const CheckUser = async(req, res)=>{
    const id  = req.params.id;
    try{
        const books = await BookMark.findAll(
            {
                where: { SongId:id },
                include: [
                    {
                        model: Users,
                        attributes: {exclude: ["password"]},
                        as: "bookstar"
                    }
                ],
            });
        if(!books){
            res.send("song wasn't have saved by users");
        }
        res.status(200).send(books);
    }catch (err){
        console.log(err);
    }
};

const Delete = async (req, res)=>{
    try {
        const id = req.params.id;
        const book = await BookMark.findOne();
        if (book) {
            await book.destroy({where:{SongId:id}});
            res.status(201).send("success");
        }else {
            res.send("user or bookmark not found"); // Если условие не выполнилось, возвращаем ошибку
        }

    }catch(err){
        console.log(err);
    }
};

const GetBookmarkStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const songId = req.params.songId;

        const bookmark = await BookMark.findOne({
            where: {
                UserId: userId,
                SongId: songId,
            },
        });

        const isFavorite = !!bookmark;

        res.json({ isFavorite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// eslint-disable-next-line no-undef
module.exports={
    addBookMark,
    GetAll,
    CheckUser,
    Delete,
    GetBookmarkStatus
};

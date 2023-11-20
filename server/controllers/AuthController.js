// eslint-disable-next-line no-undef
const db = require("../models");
const Users = db.users;
// eslint-disable-next-line no-undef
const bcrypt = require("bcrypt");
// eslint-disable-next-line no-unused-vars,no-undef
const { sign } = require("jsonwebtoken");
// eslint-disable-next-line no-undef
// const passport = require("../middlewares/AuthMiddleware");


const Auth = async(req, res) => {
    const { email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            email: email,
            password: hash,
        });
        const userId = newUser.id;
        res.json({ message: "Success", userId });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            return res.json({ error: "User doesn't exist" });
        }

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                return res.json({ error: "Wrong username and password combination" });
            }
            const accessToken =sign({username:user.username, id:user.id},
                "importantsecret");
            return  res.send({
                user: user,
                token: accessToken
            });
        })


            .catch((error) => {
                console.error(error);
                return res.json({ error: "Error comparing passwords" });
            });
    } catch (error) {
        console.error(error);
        return res.json({ error: "Internal server error" });
    }
};




const ChangePassword = async(req, res) => {
    const { user, oldPassword, newPassword } = req.body;
    if (!user) {
        res.json("Unauthorized");
    }
    bcrypt.compare(oldPassword, user.password).then((match) => {
        if (!match) {
            return res.json({ error: "Wrong password" });
        }
        bcrypt.hash(newPassword, 10).then(async(hash) => {
            await Users.update({ password: hash }, { where: { email: user.email } });
            res.json("Success");
        });
    });
    // eslint-disable-next-line no-undef
};

// eslint-disable-next-line no-undef
module.exports={
    Auth,
    Login,
    ChangePassword
};
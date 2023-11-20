// eslint-disable-next-line no-unused-vars,no-undef
const authController = require("../controllers/AuthController");
// eslint-disable-next-line no-unused-vars,no-undef
const router = require("express").Router();
// eslint-disable-next-line no-undef
const passport = require("../middlewares/AuthMiddleware");



router.post("/auth", authController.Auth);
router.post("/login", authController.Login);
router.put("/login/change", passport.authenticate("jwt", { session: false }), authController.ChangePassword );
// eslint-disable-next-line no-undef
module.exports=router;
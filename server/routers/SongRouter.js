// eslint-disable-next-line no-unused-vars,no-undef
const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const SongController = require("../controllers/SongController");
// eslint-disable-next-line no-undef
const passport = require("../middlewares/AuthMiddleware");

router.post("/add", passport.authenticate("jwt", { session: false }),SongController.upload, SongController.AddSongs);
router.get("/get", passport.authenticate("jwt", { session: false }), SongController.GetAll);
router.get("/get/:id",passport.authenticate("jwt", { session: false }), SongController.GetById);
router.put("/edit/:id",passport.authenticate("jwt", { session: false }),SongController.upload, SongController.EditSong);
router.delete("/del/:id",passport.authenticate("jwt", { session: false }), SongController.DeleteSong);
// eslint-disable-next-line no-undef
module.exports=router;
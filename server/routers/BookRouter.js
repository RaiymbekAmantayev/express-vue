// eslint-disable-next-line no-unused-vars,no-undef
const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const BookController = require("../controllers/BookMarkController");
// eslint-disable-next-line no-undef
const passport = require("../middlewares/AuthMiddleware");
// eslint-disable-next-line no-undef
const BookMarkController = require("../controllers/BookMarkController");

router.post("/add",passport.authenticate("jwt", { session: false }),BookController.addBookMark );
router.get("/get",passport.authenticate("jwt", { session: false }),BookController.GetAll );
router.get("/get/:id",passport.authenticate("jwt", { session: false }),BookController.CheckUser );
router.delete("/del/:id",passport.authenticate("jwt", { session: false }),BookController.Delete );
router.get("/:songId/status",passport.authenticate("jwt", { session: false }), BookMarkController.GetBookmarkStatus);
// eslint-disable-next-line no-undef
module.exports=router;
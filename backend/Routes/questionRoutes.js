const express = require("express")
const {togglePinQuestion,updateQuestionNote,addQuestionsToSession} = require("../controllers/questionController")

const router = express.Router();
const {protect} = require("../middlewares/authMiddleware")

router.post("/add",addQuestionsToSession)
router.post("/:id/pin",protect,togglePinQuestion)
router.post("/:id/note",updateQuestionNote)
module.exports = router;

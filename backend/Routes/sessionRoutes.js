 const express = require("express")
const {createSession,getSessionById,getMySessions,deleteSession} = require("../controllers/sessionController")
 const router = express.Router();
const protect = require("../middlewares/authMiddleware")
router.post("/create", protect, createSession)
router.get("/my-sessions",protect,getMysession)
router.get("/:id",protect,getSessionById)
router.delete("/:id",protect,deleteSession)
module.exports = router;
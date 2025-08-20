require("dotenv").config();
const Path = require("path");
const express = require("express")
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const questionRoutes = require('./routes/questionRoutes')
const {protect} = require("./middlewares/authMiddleware")
const {generateConceptExplanation,generateInterviewQuestions} = require("./controllers/aiController")
app = express();

app.use(cors({origin:"*",
	methods :["GET","POST","PUT","DELETE"],
	allowedHeaders : ["Content-Type","Authorization"],
}))
connectDB()
//
app.use(express.json())
//routes
app.use("/api/auth",authRoutes)
app.use("/api/sessions",sessionRoutes)
app.use("/api/questions",questionRoutes)

app.use("/api/ai/generate-questions",protect,generateInterviewQuestions)
app.use("/api/ai/generate-explanation",protect,generateConceptExplanation)

app.use("/uploads",express.static(Path.join(__dirname,"uploads")))
//start server
PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`listenling on port ${PORT}`))
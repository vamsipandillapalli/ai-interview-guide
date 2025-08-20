const Question = require("../models/Question")
const Session = require("../models/Session")

// add additional quesions to existing session
exports.addQuestionsToSession = async (req,res)=>
{
	try{
		const{sessionId,questions} = req.body;
		if(!sessionId || !questions || !Array.isArray(questions))
		{
			return res.status(400).json({message:"Invalid Input data"})
		}
		const session = await Session.findById(sessionId)
		if(!session)
		{
			return res.status(404).json({message:"Session not found"})
		}
		const createdQuestions = await Question.insertMany(questions.map((q)=>
		({
			session:sessionId,
			question: q.question,
			answer : q.answer,
		}))
	)
	session.questions.push(...createdQuestions.map((q)=>
	{
		return q._id
	}))
	await session.save()
	res.status(200).json(createdQuestions)
	}
	catch(error)
	{
		res.status(500).json({success:false,message:"server error"})
	}
}
//api for toggle
exports.togglePinQuestion = async (req,res)=>
{
	try{
        const questionId = req.params.id;
        const question = await Question.findById(questionId);
		if(!question)
		{
			return res.status(404).json({success:false,message:"Question not found"})
		}
		question.isPinned = !question.isPinned;
		await question.save()
		res.status(200).json({sucess:true,question})
	}
	catch(error)
	{
		res.status(500).json({success:false,message:"server error"})
	}
}
exports.updateQuestionNote = async (req,res)=>
{
	try{
		const {note} = req.body;
         const questionId = req.params.id
		 const question = await Question.findById(questionId)
		 if(!question)
		{
			return res.status(404).json({success:false,message:"Question not found"})
		}
		question.note = note || "";
		await question.save()
		res.status(200).json({success:true,question})
	}
	catch(error)
	{
		res.status(500).json({success:false,message:"server error"})
	}
}

const {GoogleGenAI} =  require('@google/genai')
const {conceptExplainPrompt,questionAnswerPrompt} = require('../utils/prompts')

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})
const generateInterviewQuestions = async (req,res)=>
{
	try
	{
		const {role,experience,topicsToFocus,numberOfQuestions} = req.body;
		if(!role || !experience || !topicsToFocus || !numberOfQuestions)
		{
			return res.ststus(400).json({message:"Missing required fields"})
		}
		const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions)
		const response = await ai.models.generateContent(
			{
				model : "gemini-2.0-flash-lite",
				contents:prompt
			}
		)
		let rawText = response.text;
		const cleanedText = rawText.replace(/^```json\s*/, "")
		.replace(/```$/,"")
		.trim();
		const data = JSON.parse(cleanedText)
		res.status(200).json(data)
	}
	catch(error)
	{
		res.status(500).json({success: false,message:"error in genarating questions"})
	}
}
const generateConceptExplanation = (req,res)=>
{
try
	{

	}
	catch(error)
	{
		res.status(500).json({message:"Failed to genarate",error:error.massage})
	}
}
module.exports ={generateConceptExplanation,generateInterviewQuestions}
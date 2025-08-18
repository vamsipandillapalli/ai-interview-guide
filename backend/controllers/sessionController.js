const Session = require("../models/Session")
const Question = require("../models/Question")


exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionsDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer, // ✅ match your schema
        });
        return question._id;
      })
    );

    session.questions = questionsDocs;
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("Error in createSession:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// access private
exports.getMySessions =  async (req,res) =>
{

	try{
     const sessions = await Session.find({user:req.user.id}).sort({createdAt:-1}).populate("questions")
	 res.json({success:true,sessions})
	}
	catch(error)
	{
		res.status(500).json({success:false,message:"server error"})
	}
}
// access private
exports.getSessionById = async (req,res) => 
{
	try{
		 const session = await Session.findById(req.params.id).populate({
      path : "questions",
      options: {sort:{isPinned:-1,createdAt:1}},
     }).exec()
     if(!session)
     {
      return res.status(404).json({success:false,message:"session not found"})
     }
     res.status(200).json({success:true,session})

		}
		catch(error)
		{
			res.status(500).json({success:false,message:"server error",error:error.message})
		}

}
// @route /api/sessions/:id
// access private
exports.deleteSession = async (req,res) =>
	{
		try{
      const session = await Session.findById(req.params.id);
      if(!session)
      {
        return res.status(404).json({success:false,message:"session not found"})
      }
      if(session.user.toString()!=req.user.id)
      {
        return res.status(401).json({message:"authorization not found"})
      }
      await Question.deleteMany({session:session._id})
      await session.deleteOne();
      res.status(200).json({success:true,message:"session deleted "})

		}
		catch(error)
		{
			res.status(500).json({success:false,message:"server error"})
		}
	}


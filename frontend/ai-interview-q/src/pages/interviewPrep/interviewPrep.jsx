import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";
import {LuCircleAlert,LuListCollapse} from 'react-icons/lu'
import SpinnerLoader from '../../components/Loaders/SpinnerLoader'
import {toast } from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader'
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment'
import QuestionCard from '../../components/Cards/QuestionCard';
function interviewPrep() {
	const {sessionId}=useParams()
	const [sessionData,setSessionData]=useState(null);
	const [errotMsg,setErrorMsg]=useState("");
	const [openLeanMoreDrawer,setOpenLearnMoreDrawer]=useState(false);
	const [isLoading,setIsLoading]=useState(false);
	const [isUpdateLoader,setIsUpdateLoader]=useState(false);
	//featch session data from backend using sessionId
	const fetchSessionById=async()=>{
		try{
			const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
			if(response.data && response.data.session)
			{
				setSessionData(response.data.session);
			}
		}
		catch(error)
		{
			console.error("Error fetching session data:", error);
		}
	}
	
	const generateConceptExplanation=async()=>{

	}
	const toggleQuestonPinStatus =async()=>{}
	const uploadMoreQuestions = async()=>{}
    useEffect(() => {
		if(sessionId){
			fetchSessionById();
		}
		return ()=>{};
	},[]);
  return (
	<DashboardLayout>
		
   <RoleInfoHeader
   role = {sessionData?.role||"N/A"}
   topicToFocus={sessionData?.topicsToFocus||"N/A"}
   experience ={sessionData?.experience||"N/A"}
   questions = {sessionData?.questions?.length||0}
   description = {sessionData?.description||"N/A"}
   lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("DD MMM YYYY") // ✅ moment formatting
            : "N/A"
        }/>
		<div className='container mx-auto pb-4 pt-4 px-4 md:px-0'>
			<h2 className="text-lg font-semibold color-black "> Interview Q&A</h2>
			<div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
				<div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" :"md:col-span-8"}`}>
					<AnimatePresence>
						{sessionData?.questions?.map((data,index)=>
						{
							return(
								<motion.div
								key = {data._id||index}
								initial={{opacity:0,y:-20}}
								animate={{opacity:1,y:0}}
								exit ={{opacity:0,scale:0.95}}
								transition={{duration:0.4,type:"spring",
									stiffness:100,
									damping:15,
									delay:index*0.1
								}}
								layout
								layoutId={`question-${data._id||index}`}
								>
									<>
									<QuestionCard
											question={data?.question}
											answer={data?.answer}
											onLearnMore = {()=>generateConceptExplanation(data.question)}
											isPinned={data?.isPinned}
											onTogglePin = {()=>toggleQuestonPinStatus(data._id)}
										/>
										</>
										</motion.div>
							)
						})}
					</AnimatePresence>
				</div>
			</div>
		</div>
	</DashboardLayout>
  )
}

export default interviewPrep

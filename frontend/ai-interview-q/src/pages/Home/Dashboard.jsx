import React, { useEffect, useState } from 'react'
import {LuPlus} from 'react-icons/lu'
import {CARD_BG} from "../../utils/data"
import toast from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { API_PATHS } from '../../utils/apiPaths'
import SummaryCard from '../../components/Cards/SummaryCard'
import moment from 'moment'
import axiosInstance from '../../utils/axiosinstance'
import CreateSessionForm from './CreateSessionForm'
import Modal from '../../components/Loaders/Modal'
function Dashboard() {
	const navigate = useNavigate()
	const [openCreateModel , setOpenCreateModel] = useState(false)
	const [sessions, setSessions] = useState([])
	const [openDeleteAlert, setOpenDeleteAlert] = useState({
		open : false,
		data : null
	})
	const fetchAllSessions = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
    const sessionsArray = response.data.sessions; // ✅ extract sessions
   // console.log("Fetched sessions:", sessionsArray);
    setSessions(Array.isArray(sessionsArray) ? sessionsArray : []);
  } catch (error) {
    console.log("Error fetching sessions", error);
    setSessions([]); // fallback
  }
};

const deleteSession = async (sessionData)=>{
}
useEffect(()=>{
	fetchAllSessions()
},[])
  return (
	<DashboardLayout>
	  <div className = "container mx-auto pt-4 pb-4">
		<div className = "grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
			
			{sessions?.map((data,index)=>(
				<SummaryCard
       key={data?._id}
       colors={CARD_BG[index % CARD_BG.length]}
       role={data?.role || "N/A"}
       topicsToFocus={data?.topicsToFocus || ""}
       experience={data?.experience || "__"}
       questions={Array.isArray(data?.questions) ? data.questions.length : 0}
       description={data?.description || ""}
       lastUpdated={data?.updatedAt ? moment(data?.updatedAt).format("Do MMM YYYY") : "N/A"}
       onSelect={() => navigate(`/interview-prep/${data?._id}`)}
       onDate={() => setOpenDeleteAlert({ open: true, data })}
/>

			))}
			</div>
				<button 
				className = "h12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-orange-400 to-orange-600 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-400/30 fixed bottom-10 md:bottom-20 right-10 md:right-20 "
				onClick = {()=> setOpenCreateModel(true)}
				>
					<LuPlus className = "text-2xl text-white"/>
					Add new 
				</button>
			</div>
			<Modal
			isOpen = {openCreateModel}
			
			onClose = {() => setOpenCreateModel(false)}
			hideHeader
			>
				<div>
					<CreateSessionForm/>
				</div>
			</Modal>

	</DashboardLayout>
  )
}

export default Dashboard

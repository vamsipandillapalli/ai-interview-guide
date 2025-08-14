import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
function Signup({setCurrentPage}) {
	const [profilePic, setProfilePic] = useState(null);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const HandleSignUp = async (e) => {
		e.preventDefault();
	}

  return (
	<div className="w-[90vw] md:w-[33vw] p-7 flex flex-col items-center justify-center ">
		<h3 classname = "text-lg font-semibold text-black">
			create An Account</h3>
			<p className="text-xs texte-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>
				<form onSubmit={HandleSignUp} >
					<ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
					<div className="grid grid-cols-1 md:grid-col-1 gap-2">
						<Input 
						type = "text"
						placeholder = "full name"
						value = {fullName}
						label = "Full Name"
						onChange={ ({target})=> setFullName(target.value)}
						/>
						<Input
						type = "text"
						placeholder = "email@gmail.com"
						value = {email}
						label = "Email  Address"
						onChange = {({target}) => setEmail(target.value)}
						/>
						<Input
						type = "password"
						value={password}
						label= "Enter password"
						placeholder = "password min 8 characters"
						onChange = {({target})=>{setPassword(target.value)}}
						/>
					</div>
					{error && <p className="text-red-500 text-xs pb-2.5" >{error}</p>}
					<button type="submit" className="btn-primary">
						Sign Up
					</button>
					< p className= "text-[13px] text-state-800 mt-3">
					Already an acoount?{""}
					<button className="font-meduim text-orange-400 underline cursor-pointer" onClick={() => {
						setCurrentPage("login")
					}}>login</button>
					</p>

				</form>
		
	</div>
  )
}

export default Signup

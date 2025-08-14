import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';
const Login = ({setCurrentPage}) => {
    const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [error,setError] = useState(null);
	const navigate = useNavigate()
	const handleLogin = async (e) =>
	{
		e.preventDefault()
	};
	
	return (
	<div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center ">
		<h3 className = "text-lg font-semibold text-black">
	         Welcome back
			 <p className= "text-xs text-slate-700 mt-[5px] mb-6">
				Please enter your details to login
			 </p>
		</h3>
	  <form onSubmit={handleLogin}>
		<Input
		value = {email}
		onChange = {({target})=>setEmail(target.value)}
		label = "email address"
		placeholder = "vamsi@example.com"
		type = "text"/>
		<Input
		value = {password}
		onChange = {({target})=>setPassword(target.value)}
		label = "password"
		placeholder = "Min 8 characters"
		type = "password"/>
	  </form>
	  {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
	  <button type="submit" className="btn-primary">
		Login
	  </button>
	  <p className="text-[13px] text-slate-800 text-center mt-3 ">
		Don't have an account? {""}
		<button className ="font-meduim text-orange-400 underline " 
		onClick={() => {setCurrentPage("signup")}}>
			Signup
			</button>
	  </p>
	</div>
  )
}

export default Login

import React,{useRef,useState} from 'react'

import {LuUser,LuUpload,LuTrash} from 'react-icons/lu'
const ProfilePhotoSelector = ({image,setImage,preview,setPreview}) => {
    const inputRef = useRef(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const handleImageChange = (event) => {
		const file = event.target.files[0]
		if(file)
		{
			setImage(file)
			const preview = URL.createObjectURL(file)
			if(setPreview)
			{
				setPreview(preview)
			}
			setPreviewUrl(preview)
		}
	}
	const handleRemoveImage = () =>
	{
		setImage(null)
		setPreviewUrl(null)
		if(setPreview)
		{
			setPreview(null)
		}
	}
	const onChooseFile = () =>
	{
		inputRef.current.click();
	}
	return (
	<div className = "">
	  <input
		type = "file"
		accept = "image/*"
		ref = {inputRef}
		onChange={(handleImageChange)}
		className = ""/>
		{!image ? (
			<div className="w-[100px]">
			<LuUser className=""/>
			<button type = "button"
			className=""
			onClick={onChooseFile}>
			<LuUpload/>
			</button>
			</div>
		):(
			<div className="w-[100px] ">
				<img scr= {preview || previewUrl}
				alt = "profile photo"
				className="w-full h-full object-cover rounded-full"
				/>
				<button type="button"
				className = ""
				onClick = {handleRemoveImage}>
				<LuTrash/>	</button>
			</div>	
		)}
			
	</div>

)}

export default ProfilePhotoSelector

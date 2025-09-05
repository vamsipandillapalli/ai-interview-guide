export const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;	
	return regex.test(email);
};
export const getInitials = (title) =>
{
	if (!title) return "";
	let start = "";
	const words = title.trim().split(" ");
	for(let i=0; i< Math.min(2, words.length); i++)
	{
		start += words[i][0].toUpperCase();
	}
	return start;
};


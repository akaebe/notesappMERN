import {React ,useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Passwordinput from '../../components/Input/Passwordinput'
import { validateEmail } from '../../utils/helper'
import axiosinstance from '../../utils/axiosinstance'




const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error , setError] = useState("")
  const handlelogin = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    


    setError("");
    // API CALL
    try{
      console.log("About to send request...");
      const response = await axiosinstance.post("/login",{
        email:email,
        password:password

      })
      console.log("axiosinstance:", axiosinstance);
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate("/dashboard")
      }

    }catch(error){
      console.log("Error:", error);
      if(error.response && error.response.data.message && error.response.data){
      setError(error.response.data.message)
    }else{
      setError("Something went wrong")
    }
  }
  };
  
  return (
    <>
      <Navbar/>

      <div className='flex items-center justify-center mt-28' >
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handlelogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input
             type="text"
             placeholder='Email' 
             className='input-box' 
             value ={email}
             onChange={(e)=>{setEmail(e.target.value)}}/>
            <Passwordinput value={password} 
            placeholder='Password' 
            onchange={(e)=>{setPassword(e.target.value)}}/>
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type ="submit" className='btn-primary'>Login</button>
            <p className='text-sm text-center mt-4 '>
              Not Registered Yet ? {" "}
              <Link to ="/signup" className='font-medium text-primary underline'>Create an Account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
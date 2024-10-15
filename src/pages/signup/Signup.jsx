import React,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Passwordinput from '../../components/Input/Passwordinput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosinstance from '../../utils/axiosinstance'


const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error , setError] = useState("")
  const [name , setName] = useState("")
  const navigate = useNavigate()
  const handlesignup =  async (e) => {
    e.preventDefault();
    if(!name){
      setError("Name is required")
      return
    }
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
      const response = await axiosinstance.post("/create-account",{
        fullName:name,
        email:email,
        password:password

      })
      //succedfull registration
      if(response.data && response.data.error){
        setError(response.data.message)
        return
        
      }
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


  }

  
  return (
    <>
    <Navbar/>
    <div className='flex item-center justify-center mt-24' >
    <div className='w-96 border rounded bg-white px-7 py-7'>
        <form onSubmit={handlesignup}>
          <h4 className='text-2xl mb-7'>Signup</h4>
          <input
             type="text"
             placeholder='Name' 
             className='input-box' 
             value ={name}
             onChange={(e)=>{setName(e.target.value)}}
             />

<input
             type="text"
             placeholder='Email' 
             className='input-box' 
             value ={email}
             onChange={(e)=>{setEmail(e.target.value)}}
             />

<Passwordinput value={password} 
            placeholder='Password' 
            onchange={(e)=>{setPassword(e.target.value)}}/>

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type ="submit" className='btn-primary'>Create an account</button>

            <p className='text-sm text-centre mt-4 '>
              Already have an account ? {" "}
              <Link to ="/login" className='font-medium text-primary underline'>Login</Link>
            </p>
        </form>
      </div>
    </div>

    
  </>
  )
}

export default Signup
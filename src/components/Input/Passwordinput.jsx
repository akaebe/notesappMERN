import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa'

const Passwordinput = ({value , onchange ,placeholder}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='flex items-centre bg-transparent border-[1.5px] rounded px-5 mb-3 outline-none'>
      <input
      value={value}
       onChange={onchange} 
       placeholder={placeholder || "Password" }  
       type={showPassword ? "text" : "password"} 
       className='w-full text-sm bg-transparent  rounded py-3 mr-3 outline-none'
      />
       {showPassword?
        (<FaRegEye size ={22} 
          className='text-primary cursor-pointer mt-2.5' 
          onClick={() => setShowPassword(!showPassword)} />)
        :(<FaRegEyeSlash size ={22} 
        className='text-slate-400  cursor-pointer mt-2.5 ' 
        onClick={() => setShowPassword(!showPassword)}/>)}
    </div>
  )
}

export default Passwordinput
import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'



const Navbar = ({userInfo}) => {
  const [searchQuery ,setsearchQuery] =useState("")
  const navigate = useNavigate()
  const onLogout = () =>{
    navigate("/login")
    localStorage.clear()
  }
  const handleserch = () =>{}
  const onclearserch = () =>{
    setsearchQuery("")
  }
  

  return (
    <div className ="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
        <SearchBar value ={searchQuery}
        onChange={({target})=>{setsearchQuery(target.value)}}
        onclearserch={onclearserch}
        handleserch={handleserch}/>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}
        />
        </div>
  )
}

export default Navbar
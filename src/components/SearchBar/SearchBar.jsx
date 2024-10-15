import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6"; // Corrected icon name
import { IoMdClose } from "react-icons/io"; // Correct icon import
const SearchBar = ({value,onChange,handleserch ,onclearserch}) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded'>
      <input
      type ="text"
      className='w-full text-xs bg-transparent py-[11px] outline-none'
      placeholder='Search Notes'
      value ={value}
      onChange={onChange}
      />
      {value&& (<IoMdClose className=' text-xl  text-slate-500 cursor-pointer hover:text-black mr-3' 
      onClick={onclearserch}/>) }
      <FaMagnifyingGlass className=' text-slate-400 cursor-pointer hover:text-black mr-3'
      onClick={handleserch}/>
    </div>
  )
}

export default SearchBar
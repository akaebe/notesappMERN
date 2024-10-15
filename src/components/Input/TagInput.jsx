import React ,{useState} from 'react'
import { MdAdd ,MdClose} from 'react-icons/md'

const TagInput = ({tags, settags}) => {
    const [inputvalue,setinputvalue]= useState("")
    const handleInputchange = (e) =>{
        setinputvalue(e.target.value)}
    const addnewtag =()=>{
        if(inputvalue.trim()!==""){
            settags([...tags,inputvalue.trim()])
            setinputvalue("")
    }
   


    }
    const handlekeydown = (e)=>{
        if(e.key=="Enter"){
            addnewtag()
        }

    }
    const handleRemoveTag = (tagtoremove) =>{
        settags(tags.filter((tag)=>tag!==tagtoremove))
    }
  return (
    <div>
       {tags?.length > 0 && (
  <div className='flex gap-2 items-center flex-wrap mt-2'>
    {tags.map((tag, index) => (
      <span key={index} className='gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded flex items-center'>
        #{tag}
        <button
          onClick={() => handleRemoveTag(tagtoremove)} // Implement the tag removal functionality
          className=""
        >
          <MdClose className="text-base text-red-500" />
        </button>
      </span>
    ))}
  </div>
)}






        
        <div className='flex items-center gap-4 mt-3'>
            <input type="text"
             placeholder='Add Tags'
             value={inputvalue}
             onChange={handleInputchange}
             onKeyDown={handlekeydown}
             className='text-sm bg-transparent border px-3 py-2 rounded outline-none' />
            <button onClick ={()=>{addnewtag()}}className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'>
                <MdAdd className='text-2xl  text-blue-700 hover:text-white'/>
            </button>


        </div>
    </div>
  )
}

export default TagInput
import React ,{useState}from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';  // Corrected typo
import axiosinstance from '../../utils/axiosinstance'
const AddEditNotes = ({onClose , data,type ,getAllNotes,showToastmsg}) => {
    const [title, settitle]=useState( data?.title || "")
    const [content, setcontent]=useState(data?.content || "")
    const [tags, settags]=useState( data?.tags ||[])
    const [error, setterror]=useState("")

    const addNote = async () => {
        try{
            const response = await axiosinstance.post("/add-note",{
                title,
                content,
                tags,
                
            })
            if(response.data && response.data.note){
                showToastmsg("Note Added Succcessfully")
                getAllNotes()
                onClose()
            }

        }catch(error){

            if(error.response && error.response.data && error.response.data.message){
                setterror(error.response.data.message)
                
            }

        }
    }

    const editNote = async () => {
        const noteid = data._id
        try{
            const response = await axiosinstance.put("/edit-note/"+noteid,{
                title,
                content,
                tags,
                
            })
            if(response.data && response.data.note){
                showToastmsg("Note Updated  Succcessfully")
                getAllNotes()
                onClose()
            }

        }catch(error){

            if(error.response && error.response.data && error.response.data.message){
                setterror(error.response.data.message)
                
            }

        }



    }
    const handleSubmit = () => {
        if(!title){
            setterror("Title is required")
            return
        }
        if(!content){
            setterror("Content is required")
            return
        }
        setterror("")
        if(type==="edit"){
            editNote();
        }else{
            addNote();
        }
    }

  return (
    <div className='relative'>
        <button onClick ={onClose}
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100'>
            <MdClose className="text-xl text-slate-400"/>
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input type="text"
            className='text-2xl text-slate-950 outline-none'
            placeholder='Go To Gym' 
            value ={title}
            onChange={({target} ) => settitle(target.value)}/>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label' >CONTENT</label>
            <textarea 
            type ="text"
            placeholder='content'
            value={content}
            onChange={({target} ) => setcontent(target.value)}
            rows ={10}
            className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded '
            ></textarea>
        </div>
        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} settags={settags} />

        </div>
        {error && <p className='text-red-500 text-sm pt-4' >{error}</p>}
        <button className='btn-primary font-medium mt-5 p-3' onClick={handleSubmit}>{type ==="edit" ? "UPDATE" : "ADD"}</button>
    </div>
  )
}

export default AddEditNotes
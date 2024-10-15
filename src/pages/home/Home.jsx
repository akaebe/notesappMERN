import React ,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosinstance from '../../utils/axiosinstance'
import { useEffect } from 'react'
import Toast from '../../components/Toastmessage/Toast'



const Home = () => {
  const [openaddedit,setopenaddedit]= useState({
    isShown:false,
    type:"add",
    data:null,

  })
  const [showToastmsg, setshowToastmsg] = useState({
    isShown:false,
    msg:"",
    type:"add"
  })
  const [userInfo ,setuserInfo] = useState(null)
  const [allnotes,setallnotes] = useState([])
  const navigate = useNavigate()


  const handleEdit = (noteDetails) =>{
    setopenaddedit({isShown:true,type:"edit",data:noteDetails})
    
  }
  const handleclosetoast = () =>{
    setshowToastmsg({isShown:false,msg:""})
  }

  const handleshowToastmsg = (msg,type) =>{
    setshowToastmsg({isShown:true,msg,type})
  }
 // delete note 
 const deleteNote = async (data) => {
  const noteid = data._id
  try{
      const response = await axiosinstance.delete("/delete-note/"+noteid)
      
      if(response.data && !response.data.error){
        
          handleshowToastmsg("Note Deleted Successfully", 'delete');

          getAllNotes()
      }

  }catch(error){

      if(error.response && error.response.data && error.response.data.message){
          
        console.log("unexpected error please try again");
      }

  }}




    // get user info
  const  getUserInfo = async () =>{
    try{
      const response = await axiosinstance.get("/get-user")
      
      if(response.data && response.data.user){
        setuserInfo(response.data.user)
      }else {
        console.log('No user data in response');
      }

    }catch(error){
      
      if(error.response.status === 401){
        localStorage.clear()
        navigate("/login")
        
      }

    }
  }

  //get all notes

  const getAllNotes = async () =>{
    try{
      const response = await axiosinstance.get("/get-all-notes")
      console.log('API Response:', response.data);  // Log the full response
      if(response.data && response.data.notes){
        setallnotes(response.data.notes)
      }else {
        console.log('No user data in response');
      } 

    }catch(error){
      console.log("unexpected error :",error);
      
}}




  useEffect(() => {
    getUserInfo()
    getAllNotes()
    return () => {
      
    }
    
  },[])


  
  return (
  <>
  <Navbar userInfo={userInfo}/>
  <div className='flex justify-between items-center px-4 w-full '>
    <div className='grid grid-cols-3 mt-8 gap-4 w-full'>

    {allnotes.map((item , index) =>  (
      <NoteCard 
      key={item._id}
      title ={item.title}
      date ={item.createdOn}
      content ={item.content}
      tags ={item.tags}
      isPinned ={item.isPinned}
      onEdit ={() =>handleEdit(item)} 
      onDelete ={() =>deleteNote(item)} 
      onPinNote ={() =>{}}  />
      
  

) )}
    </div>
  </div>
  <button 
  onClick={()=>setopenaddedit({isShown:true,type:"add",data:null})}
  className='w-16 h-16 flex items-center justify-center bg-primary rounded-2xl hover:bg-blue-600 absolute right-10 bottom-10'>
     <MdAdd className='text-[32px] text-white'/>
  </button>
  <Modal
   isOpen={openaddedit.isShown}
   onRequestClose={() => setopenaddedit({ isShown: false, type: '', data: null })} 
  style ={{overlay:{background:'rgba(0,0,0,0.2)'}}}
  contentLabel=""
  className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll" >
    <AddEditNotes
    type ={openaddedit.type}
    data ={openaddedit.data}
    getAllNotes = {getAllNotes}
    showToastmsg={handleshowToastmsg}
    onClose={() => setopenaddedit({ isShown: false, type: 'add', data: null })}/>
  </Modal>
  <Toast
  isShown={showToastmsg.isShown}
  msg={showToastmsg.msg}
  type={showToastmsg.type}
  onClose={handleclosetoast}
  showToastmsg={showToastmsg}
  />
  
  </>
  )
}

export default Home



import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Navbar'
import NoteCard from '../../component/Cards/NoteCard'
import { MdAdd, MdOutlineAlarmAdd, MdOutlineElderly } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { all } from 'axios'

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [notes, setNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //Get user Info
  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }   
    } catch(error){
      if(error.response && error.response.status === 401){
        localStorage.clear();
        navigate('/login');
    }
  }
};
  //Get all Notes
  const getAllNotes = async () => {
    try{
      const response = await axiosInstance.get("/get-all-notes");
      if(response.data && response.data.notes){
        setNotes(response.data.notes);
      }   
    } catch(error){
     console.log("An error occurred while fetching notes");
    }
  };

  useEffect(()=>{
    getAllNotes();
    getUserInfo();
    return ()=>{};
  }, []);
  return (
   <>
   <Navbar userInfo={userInfo}/>
   <div className='container mx-auto'>
    <div className='grid grid-cols-3 gap-4 mt-8'>
     {allNotes.map((note, index)=>(
    <NoteCard 
    key={item._id}
    title={item.title}
    date={item.createdOn}
    content={item.content}
    tags={item.tags}
    isPinned={item.isPinned}
    onEdit={()=>{}}
    onDelete={()=>{}}
    onPinNote={()=>{}}
    /> 
     ))}  
   </div>
   </div>
   <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
   onClick={()=>{
      setOpenAddEditNote({
        isShown: true,
        type: "add",
        data: null
      });
   }}>
    <MdAdd className="text-{32px} text-white items-center"/>
   </button>
   <Modal 
   isOpen={openAddEditNote.isShown} 
   onRequestClose={()=>{}}
   style={{
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)'
    },
   }}
   contentLabel=""
   className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"    
   >
   <AddEditNotes
   type={openAddEditNote.type}
    noteData={openAddEditNote.data} 
    onClose={()=>{
      setOpenAddEditNote({
        isShown: false,
        type: "add",
        data: null
      });
    }}/>
   </Modal>
   </>
  );
};

export default Home

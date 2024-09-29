import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Navbar'
import NoteCard from '../../component/Cards/NoteCard'
import { MdAdd, MdOutlineAlarmAdd, MdOutlineElderly } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../component/ToastMessage/Toast';
import EmptyCard from '../../component/EmptyCard/Emptycard';
import AddNotesImg from '../../assets/images/add-notes.png';  
import NoDataImg from '../../assets/images/no-data.png';

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  });

  const [notes, setNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditNote({
      isShown: true,
      type: "edit",
      data: noteDetails
    });
  }

  const showToastMessage = (message,type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: ""
    });
  }

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
     console.log("An unexpected error occurred. please try again later");
    }
  };

  //delete note
  const deleteNote = async(data) => {
    const noteId=data._id;
    try{
      const response = await axiosInstance.delete("/delete-note/"+noteId);
      
      if(response.data && !response.data.error){
        showToastMessage("Note deleted Succesfully",'delete');
        getAllNotes();
      }
    } catch(error){
     if(
      error.response &&
      error.response.data &&
      error.response.data.message
      ){
        console.log("An unexpected error occurred. please try again later");
      }
     
    }
  };

  //Search notes
  const onSearchNote = async (query) => {
    try{
      const response = await axiosInstance.get("/search-notes", {
        params: {query}
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        setNotes(response.data.notes);
      }   
    } catch(error){
     console.log(error);
    }
  }

  //Pin note
  const updatesIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try{
      const response = await axiosInstance.put(
        "/update-isPinned/"+noteId, {
        isPinned: !noteData.isPinned,
      });

      if(response.data && response.data.note){
        showToastMessage("Note updated successfully");
        getAllNotes();
      }
    } catch(error){      
          console.log(error);
        
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(()=>{
    getAllNotes();
    getUserInfo();
    return ()=>{};
  }, []);
  return (
   <>
   <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
   <div className='container mx-auto'>
   {notes.length>0? (
    <div className='grid grid-cols-3 gap-4 mt-8'>
     {notes.map((item, index)=>(
    <NoteCard 
    key={item._id}
    title={item.title}
    date={item.createdOn}
    content={item.content}
    tags={item.tags}
    isPinned={item.isPinned}
    onEdit={()=> handleEdit(item)}
    onDelete={()=>deleteNote(item)}
    onPinNote={()=>updatesIsPinned(item)}
    /> 
     ))}  
   </div> ):(
    <EmptyCard 
    imgSrc={isSearch ? NoDataImg : AddNotesImg} 
    message={isSearch? `Oops! no notes found matching your serach.`:`Start creating your first note! Click the 'Add' button to jot down your thoughts,ideas, and reminders. Let's get started!`} />
   )}
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
    }}
    getAllNotes={getAllNotes}
    showToastMessage={showToastMessage}
    />
   </Modal>
   <Toast
     isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToast}
    />
   </>
  );
};

export default Home

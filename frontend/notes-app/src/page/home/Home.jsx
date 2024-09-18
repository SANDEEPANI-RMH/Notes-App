import React from 'react'
import Navbar from '../../component/Navbar'
import NoteCard from '../../component/Cards/NoteCard'
import { MdAdd, MdOutlineAlarmAdd, MdOutlineElderly } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useState } from 'react'

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null
  });


  return (
   <>
   <Navbar/>
   <div className='container mx-auto'>
    <div className='grid grid-cols-3 gap-4 mt-8'>
    <NoteCard title="Meeting on 7th may"
    date="5th May 2024"
    content="jsfhebf jhbvjhrbg jhfbvhjbr jhbhjv"
    tags="#meetings #busy"
    isPinned={true}
    onEdit={()=>{}}
    onDelete={()=>{}}
    onPinNote={()=>{}}
    />   
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
   <AddEditNotes/>
   </Modal>
   </>
  );
};

export default Home

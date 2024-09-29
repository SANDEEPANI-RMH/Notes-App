import React from 'react';
import moment from 'moment';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import Modal from './Model';
import { useState } from 'react';

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
   // Prevent modal opening when clicking the pin, edit, or delete icons
   const stopPropagation = (e) => {
    e.stopPropagation(); // Stops the click event from bubbling up to the card
  };

  return (
    <>
    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-all ease-in-out duration-300 cursor-pointer" 
    onClick={handleCardClick}>
      <div className="flex items-start justify-between">
        <div>
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span className="text-sm text-gray-500">{moment(date).format('Do MMM YYYY')}</span>
        </div>
        <MdOutlinePushPin
          className={`text-2xl cursor-pointer hover:text-indigo-500 transition-colors duration-200 ${isPinned ? 'text-indigo-500' : 'text-gray-300'}`}
          onClick={(e) => {
            stopPropagation(e);
            onPinNote(); // Handle pin action
          }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-3">
        {content?.slice(0, 80)}{content?.length > 80 ? '...' : ''}
      </p>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-indigo-400">
          {tags.map((item, index) => (
            <span key={index} className="mr-2">#{item}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <MdCreate
            className="text-2xl text-gray-400 cursor-pointer hover:text-green-600 transition-colors duration-200"
            onClick={(e) => {
              stopPropagation(e);
              onEdit(); // Handle edit action
            }}
          />
          <MdDelete
            className="text-2xl text-gray-400 cursor-pointer hover:text-red-500 transition-colors duration-200"
            onClick={(e) => {
              stopPropagation(e);
              onDelete(); // Handle delete action
            }}
          />
        </div>
      </div>
    </div>
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={title}
      date={moment(date).format('Do MMM YYYY')}
      content={content}
      tags={tags}
    />
    </>
  );
};

export default NoteCard;

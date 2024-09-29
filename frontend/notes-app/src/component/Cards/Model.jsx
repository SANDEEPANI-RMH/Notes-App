import React from 'react';

const Modal = ({ isOpen, onClose, title, date, content, tags }) => {
  if (!isOpen) return null; // Do not render modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full text-gray-500 hover:text-red-500">
            &times; {/* Close button */}
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">{date}</p>
        <p className="text-gray-700 mb-4">{content}</p>
        <div className="text-sm text-indigo-400">
          {tags.map((tag, index) => (
            <span key={index} className="mr-2">#{tag}</span>
          ))}
        </div>
        <button 
          onClick={onClose} 
          className="mt-4 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

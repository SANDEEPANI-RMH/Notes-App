import React, { useState } from 'react';
import TagInput from '../../component/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-notes', {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage('Note added successfully');
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later');
      }
    }
  };

  // Edit note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put('/edit-note/' + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage('Note updated successfully');
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError('Something went wrong. Please try again later');
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError('Title is required');
      return;
    }
    if (!content) {
      setError('Content is required');
      return;
    }
    setError(null);

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-1 -right-1 hover:bg-gray-100 focus:bg-gray-200 transition-colors"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-gray-500" />
      </button>

      <div className="flex flex-col gap-3">
        <label className="text-lg font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="w-full text-xl font-semibold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          placeholder="Go to gym at 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <label className="text-lg font-medium text-gray-700">Content</label>
        <textarea
          className="w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          placeholder="Write the content of your note here..."
          rows={8}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium text-gray-700">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      <button
        className="w-full bg-indigo-600 text-white font-medium rounded-lg p-3 mt-5 hover:bg-indigo-700 transition-colors"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'Update Note' : 'Add Note'}
      </button>
    </div>
  );
};

export default AddEditNotes;

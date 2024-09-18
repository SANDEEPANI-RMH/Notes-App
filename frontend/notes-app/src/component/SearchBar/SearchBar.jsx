import React from 'react'
 import {FaSearch} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'

const SearchBar = ({value, onChange, handleSearch, onClearSerach}) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
      <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSerach}/>
      )}
      <FaSearch className="text-gray-400 text-lg cursor-pointer hover:text-black" onClick={handleSearch}/>
      
      </div>
  )
}

export default SearchBar

import React from 'react';
import { useState } from 'react';
import { FaRegEye,FaRegEyeSlash } from 'react-icons/fa';



const PasswordInput = ({value,onChange,placeholder}) => {
    const [isshowPassword, setIsShowPassword] =useState(false);
    const toggleShowPassword=()=>{
        setIsShowPassword(!isshowPassword);
    }
    ;
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
      value={value}
        onChange={onChange}
        type={isshowPassword?"text":"password"}
        placeholder={placeholder||"Password"}
        className="w-full text-sm py-3 mr-3 rounded outline-none bg-transparent"
        />
        {isshowPassword?(
            <FaRegEye 
        size={22}
        onClick={toggleShowPassword} 
        className="text-primary cursor-pointer"/>
        ):(
            <FaRegEyeSlash
            size={22}
            onClick={toggleShowPassword}
            className="text-slate-400 cursor-pointer"
            />
        )}
    </div>
  )
}

export default PasswordInput

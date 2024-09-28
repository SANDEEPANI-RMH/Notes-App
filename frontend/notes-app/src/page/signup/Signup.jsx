import React from 'react'
import Navbar from '../../component/Navbar'
import PasswordInput from '../../component/Input/passwordInput'
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const Signup = () => {
   
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate= useNavigate();

  const handleSignUp = async(e) => {
    e.preventDefault();
  
    if(!name){
      setError("Please Enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please Enter a valid email");
      return;
    }
    if(!password){
      setError("Please Enter the password");
      return;
    }

    setError('');
    //API call sign up
    try{
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
     //handle successful login response
     if(response.data && response.data.error){
       setError(response.data.message);
       return
     }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      
      }
    } catch(error){
      //handle login error
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else{
        setError("Something went wrong. Please try again later");
      }
    }
  }
  return (
   <>
   <Navbar/>
    <div className="flex items-center justify-center mt-28">
       <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input type="text" 
            placeholder="Name" 
            className="input-box"
            value={name}
            onChange={(e)=> setName(e.target.value)}/>

            <input type="text" 
            placeholder="Email" 
            className="input-box"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/>

             <PasswordInput value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
             {error && <p className="text-red-500 text-xm pb-1">{error}</p>}
            <button type="submit" className="btn-primary">Create Account</button>
            <p className="text-sm text-center mt-4">
               Already Have an account? {""}
                <a href="/login" className="font-medium text-primary underline">Login</a>
            </p>
        </form>
        </div>
    </div>    
   </>
  )
}

export default Signup

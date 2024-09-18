import React from 'react'
import Navbar from '../../component/Navbar'
import PasswordInput from '../../component/Input/passwordInput'
import { useState } from 'react';

const Signup = () => {
   
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

    setError(null);
    //API call sign up
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

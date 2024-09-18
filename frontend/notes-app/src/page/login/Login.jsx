import React from 'react'
import Navbar from '../../component/Navbar'
import PasswordInput from '../../component/Input/passwordInput'
import { validateEmail } from '../../utils/helper';
import { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async(e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter a valid email");
      return;
    }
    if(password.length<6){
      setError("Password should be atleast 6 characters");
      return;
    }
    if(password.length>20){
      setError("Password should be atmost 20 characters");
      return;
    }
    if(!password){
      setError("Please Enter the password");
      return;
    }
    setError(null);

    //API call
  };
  return (
  <>
    <Navbar/>
    <div className="flex items-center justify-center mt-28">
       <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input type="text" placeholder="Email" className="input-box"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/>

            <PasswordInput value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
            {error && <p className="text-red-500 text-xm pb-1">{error}</p>}
            <button type="submit" className="btn-primary">Login</button>
            <p className="text-sm text-center mt-4">
                Not registered? 
                <a href="/signup" className="font-medium text-primary underline">Create an account</a>
            </p>
        </form>
       </div>
    </div>
  </>
    
  )
}

export default Login

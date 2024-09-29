// import React from 'react'
// import Navbar from '../../component/Navbar'
// import PasswordInput from '../../component/Input/passwordInput'
// import { validateEmail } from '../../utils/helper';
// import { useState } from 'react';
// import axiosInstance from '../../utils/axiosInstance'; // Adjust the import path as needed
// import { useNavigate } from 'react-router-dom';



// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleLogin = async(e) => {
//     e.preventDefault();
//     if(!validateEmail(email)){
//       setError("Please Enter a valid email");
//       return;
//     }
//     if(password.length<6){
//       setError("Password should be atleast 6 characters");
//       return;
//     }
//     if(password.length>20){
//       setError("Password should be atmost 20 characters");
//       return;
//     }
//     if(!password){
//       setError("Please Enter the password");
//       return;
//     }
//     setError(null);

//     //API call
//     try{
//       const response = await axiosInstance.post("/login", {
//         email: email,
//         password: password,
//       });
//      //handle successful login response
//      if(response.data && response.data.accessToken){
//        localStorage.setItem("token", response.data.accessToken);
//        navigate('/dashboard');
//      }
//     } catch(error){
//       //handle login error
//       if(error.response && error.response.data && error.response.data.message){
//         setError(error.response.data.message);
//       } else{
//         setError("Something went wrong. Please try again later");
//       }
//     }
//   };
//   return (
//   <>
//     <Navbar/>
//     <div className="flex items-center justify-center mt-28">
//        <div className="w-96 border rounded bg-white px-7 py-10">
//         <form onSubmit={handleLogin}>
//             <h4 className="text-2xl mb-7">Login</h4>
//             <input type="text" placeholder="Email" className="input-box"
//             value={email}
//             onChange={(e)=> setEmail(e.target.value)}/>

//             <PasswordInput value={password}
//             onChange={(e)=> setPassword(e.target.value)}/>
//             {error && <p className="text-red-500 text-xm pb-1">{error}</p>}
//             <button type="submit" className="btn-primary">Login</button>
//             <p className="text-sm text-center mt-4">
//                 Not registered? 
//                 <a href="/signup" className="font-medium text-primary underline">Create an account</a>
//             </p>
//         </form>
//        </div>
//     </div>
//   </>
    
//   )
// }

// export default Login

import React from 'react';
import Navbar from '../../component/Navbar';
import PasswordInput from '../../component/Input/passwordInput';
import { validateEmail } from '../../utils/helper';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    if (password.length > 20) {
      setError('Password should be at most 20 characters');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }
    setError(null);

    // API call
    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });
      // Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 to-purple-200">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 py-10">
          <h4 className="text-3xl font-semibold text-center text-gray-700 mb-7">Login</h4>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && error.includes('email') && (
                <p className="text-red-500 text-xs absolute top-14">{error}</p>
              )}
            </div>

            <div className="relative">
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && error.includes('Password') && (
                <p className="text-red-500 text-xs absolute top-14">{error}</p>
              )}
            </div>

            {error && !error.includes('email') && !error.includes('Password') && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition ease-in-out duration-300"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600">
              Not registered?{' '}
              <a
                href="/signup"
                className="text-indigo-600 hover:text-indigo-800 font-medium underline transition ease-in-out duration-200"
              >
                Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;


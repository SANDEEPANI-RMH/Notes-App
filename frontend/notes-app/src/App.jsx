import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/home/home'
import Login from './page/login/login'
import Signup from './page/signup/signup'

const routes = (
  <Router>
   <Routes>
      <Route path="/dashboard" exact element={<Home/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/signup" exact element={<Signup/>}/>
   </Routes>
   </Router>
);

const App = () => {
  return (
    <div>
     {routes}
    </div>
  )
};

export default App;

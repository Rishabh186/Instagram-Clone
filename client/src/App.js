import React from 'react';
import NavBar from './components/navbar'
import "./App.css"
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/screens/Home'
import Signup from './components/screens/Signup'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/Createpost'


function App() {
  return (
    <BrowserRouter>
     <NavBar/>
     <Route exact path="/">
       <Home/>
       </Route>  
     <Route path="/signup">
       <Signup/>
       </Route>  
     <Route path="/login">
       <Login/>
       </Route>  
     <Route path="/profile">
       <Profile/>
       </Route> 
       <Route path="/createpost">
         <CreatePost/>
       </Route>  
    </BrowserRouter>
    
  );
}

export default App;

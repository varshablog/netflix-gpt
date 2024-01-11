import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate=useNavigate();
  const handleSignOut=()=>{

    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
       console.log(error);
    });

  }
  return (
    <div className="Header">
       <img className="w-48" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
      <button className="signOut"><span onClick={handleSignOut}className="span-text">Sign Out</span></button>
    </div>  
  )
}

export default Header

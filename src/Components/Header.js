import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSignOut=()=>{

    signOut(auth).then(() => {
     
    }).catch((error) => {
       console.log(error);
    });

  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in or signed up
       const {uid,email,displayName,photoURL} = user;
       //update redux store
         dispatch(addUser({uid:uid ,email:email, displayName:displayName,photoURL:photoURL}))
         navigate("/browse");
         
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unSubscribing onAuthStateChanged API when header component unmount
    return ()=>unsubscribe();
   },[])
  
  return (
    <div className="Header">
       <img className="w-48" src={LOGO} alt="logo" />
      <button className="signOut"><span onClick={handleSignOut}className="span-text">Sign Out</span></button>
    </div>  
  )
}

export default Header

import React, { useRef, useState } from "react";
import Header from "./Header";
import {
  checkValidateSignInData,
  checkValidateSignUpData,
  checkName,
} from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {BackgroundImage} from "../utils/constants";

const Login = () => {
  
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const [nameErr, setNameErr] = useState(null);

  const email = useRef(null);
  const passward = useRef(null);
  const name = useRef(null);
  const mobileNo = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    if (isSignInForm) {
      //validate the SignIn Form data
      const Message = checkValidateSignInData(
        email.current.value,
        passward.current.value
      );
      setErrMessage(Message);

      if (Message) return;

      //Authenticate SignIn form
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        passward.current.value
      )
        .then((userCredential) => {
          // const user = userCredential.user;
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //validate the SignUp Form data
      const Message = checkValidateSignUpData(
        email.current.value,
        passward.current.value,
        name.current.value,
        mobileNo.current.value
      );
      setErrMessage(Message);

      if (Message) return;

      //Authenticate SignUp Form
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        passward.current.value 
      )
        .then((userCredential) => {
          const user = userCredential.user;
          //update userInfo with userName
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const handleNameError = () => {
    //validate name
    const Mess = checkName(name.current.value);
    setNameErr(Mess);
  };
  return (
    <div className="Login">
      <Header />

      <div>
        <img
          className="bgImage"
          src={BackgroundImage}
          alt="backgroundImage"
        />
      </div>

      <div className="formData">
        <form onSubmit={(e) => e.preventDefault()} action="" className="form">
          <h2>{isSignInForm ? "Sign In" : "Sign Up"}</h2>

          {!isSignInForm && (
            <>
              <input
                ref={name}
                onBlur={handleNameError}
                type="text"
                placeholder="Enter Full Name"
              />
              {nameErr != null && <p className="errmessage">{nameErr}</p>}

              <input ref={mobileNo} type="number" placeholder="Mobile Number" />
              <input
                ref={passward}
                type="passward"
                placeholder="Create Passward"
              />
            </>
          )}

          <input ref={email} type="email" placeholder="Email Address" />

          {isSignInForm && (
            <input ref={passward} type="passward" placeholder="Passward" />
          )}

          <p className="errmessage">{errMessage}</p>
          <button onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="new-User">
            {isSignInForm ? (
              <p>
                New to Netflix?
                <span onClick={toggleSignInForm}>Sign up now</span>
              </p>
            ) : (
              <p>
                Already User?
                <span onClick={toggleSignInForm}>Sign In now</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
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
          const user = userCredential.user;
          navigate("/browse");
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
              navigate("/browse");
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg"
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

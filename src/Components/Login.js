import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="Login">
      <Header />
      <div>
        <img
          className="bgImage"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="backgroundImage"
        />
      </div>
      <div className="formData">
        <form action="" className="form">
          <h2>{isSignInForm ? "Sign In" : "Sign Up"}</h2>
          {!isSignInForm && (<><input type="text" placeholder="Enter Full Name" />
         
          <input type="number" placeholder="Mobile Number" />
          <input type="passward" placeholder="Create Passward" /></>
          )}

          <input type="email" placeholder="Email Address" />
          {isSignInForm && <input type="passward" placeholder="Passward" />}
          <button>{isSignInForm ? "Sign In" : "Sign Up"}</button>
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

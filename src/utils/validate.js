
export const checkValidateSignInData=(email,passward)=>{

   const isValidEmail=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
   const isValidPassward=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(passward)

   if(!isValidEmail) return "Please Enter a valid email address";
   if(!isValidPassward) return "Passward Is Not Valid";
   
   return null;
}

export const checkValidateSignUpData=(email,passward,name,mobile)=>{
   const isValidEmail=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
   const isValidPassward=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(passward)
   const isValidName=/^[a-zA-Z]+ [a-zA-Z]+$/.test(name);
   const isValidMobile=/(0|91)?[6-9][0-9]{9}/.test(mobile);

   if(name.length === 0) {
      return "Please Enter Name First";
   }else if(!isValidName) return "Please Enter Valid Name";
   
   if(!isValidMobile) return "Mobile Number is not valid";
   if(!isValidPassward) return "Passward Is Not Valid";
   if(!isValidEmail) return "Please Enter a valid email address";
   return null;
}

export const  checkName=(name)=>{
    const isNameValid=/^[a-zA-Z]+ [a-zA-Z]+$/.test(name);
    if(name.length === 0) {
      
      return "Please Enter Name First";
   }else if(!isNameValid) return "Please Enter Valid Name";
   return null;
}
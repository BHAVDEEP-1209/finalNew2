import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "../Styles/Register.scss"
import { SignIn, SignUp } from '../utils/utils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setBusiness, setValue } from '../slices/userSlice'
import { setAddress } from '../slices/userSlice'
import google from "../assets/google.svg";
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { Link } from 'react-router-dom'
import { Button, notification, Space } from 'antd';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const intialValues = { email : "", password : ""}
  const [formValues,setFormValues] = useState(intialValues);

    ////////////////////notification
    const [api, contextHolder] = notification.useNotification();
    let msg = useState("");
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: msg,    
      });
    };
    //////////////////////////
  
  // validation fields
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = (e) =>{
    const {name,value} = e.target

    //handling errors
    setFormErrors(prev =>{
      return {
        ...prev,
        [name] : ""
      }
    })
    setFormValues((prev) =>{

      return {
        ...prev,
        [name]: value
      }
    })
  }

  // validation
  const validate=(values)=>{
    const errors = {};
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!values.email) {
      errors.email = "Input required!";
    } else {
      const ch = values.email.at(0);
      if (ch >= "0" && ch <= "9") {
          if(values.email.length!=10){
            errors.email = "Invalid Phn Number!";
          }
      } else {
        if (!regex.test(values.email)) {
          errors.email = "Invalid Email Address!";
        }
      }
    }
    if(!values.password){
      errors.password = "Password required!";
    }else if(values.password.length<6){
      errors.password = "Password too short!"
    }
    return errors;
  }
 

  // click on register button
  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true); 
  }



  // validates erros and calls the function when there is no error
  useEffect(()=>{
    const setData=async()=>{
     try {
      const result = await SignIn(formValues);
      if(result.status==200){
        console.log(result.data);
     
        if(result.data.disabled==true){
         
          msg = "Access Denied: Access Blocked By Admin!"
          openNotificationWithIcon('error')
          return;
        }

        msg = "Success!"
        openNotificationWithIcon('success')

        setTimeout(()=>{
          dispatch(setValue(result.data));
          dispatch(setAddress(result.data?.address?.at(0)))
          dispatch(setBusiness(result.data.business));
          navigate("/homepage")
        },500)

        // console.log(result.data);


      }else if(result.status==204){
        msg = "No Such Email Exists!"
        openNotificationWithIcon('warning')
      }else{
        msg = "Wrong Password!"
        openNotificationWithIcon('error')
      }
     } catch (error) {
      msg = "Something Went Wrong!"
      openNotificationWithIcon('error')
     }
     
    }
    if(Object.keys(formErrors).length===0 && isSubmit){
      setData();
    }
  },[formErrors])

  /// google sign in using firebase
  const handleGoogleSignIn = async () => {
    
    try {
      const response = await signInWithPopup(auth, provider);
      let userData = {
        name: response.user.displayName,
        email: response.user.email,
        image: response.user.photoURL,
      };

      try {
        const result = await SignUp(userData);
        msg = "Success!"
        openNotificationWithIcon('success')

        setTimeout(()=>{
          navigate("/hompepage");
          dispatch(setValue(result.data));
        },500)

      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      msg = "Error, Reason : User clicked outside of Pop up during login!"
      openNotificationWithIcon('error')
    }

  };

  return (
    <div className='register'>
      {contextHolder}
        <Navbar />
        <div className="imgContainer">
        <img src="https://assets.burberry.com/is/image/Burberryltd/MyAccount.jpg?$BBY_V2_BASIC$&wid=1875&hei=375" alt="" />
        <span >SIGN IN</span>
        </div>
        <div className="formContainer">
            <form  onSubmit={handleSubmit}>
              <h1>ACCOUNT</h1>
              <div className="inputDetails" >
              <input type="text" name="email" placeholder='Enter Email/Phn Number..' value={formValues.email} onChange={handleChange}/>
              <p className='error'>{formErrors?.email}</p>
              <input type="password" name="password" placeholder='Enter Your Password...' value={formValues.password} onChange={handleChange}/>
              <p className='error'>{formErrors?.password}</p>
              <button type="submit">SIGN IN</button>
              </div>
              <div className="otherSignInOptions">
            <div onClick={handleGoogleSignIn}>
              <img src={google} alt="" />
              <span>Google</span>
            </div>
          </div>
            </form>
            <Link to ="/register">SignUp</Link>
        </div>

    </div>
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "../Styles/Register.scss"
import { SignIn } from '../utils/utils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setValue } from '../slices/userSlice'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const intialValues = { email : "", password : ""}
  const [formValues,setFormValues] = useState(intialValues);
  
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

    if(!values.email){
      errors.email = "Email required!";
    }else if(!regex.test(values.email)){
      errors.email = "Invalid Email Address!"
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
        window.alert("success");
        dispatch(setValue(result.data));
        navigate("/homepage")
      }else if(result.status==204){
        window.alert("no such email!")
      }else{
        window.alert("Wrong Password!");
      }
     } catch (error) {
      window.alert("error")
     }
     
    }
    if(Object.keys(formErrors).length===0 && isSubmit){
      setData();
    }
  },[formErrors])

  return (
    <div className='register'>
        <Navbar />
        <div className="imgContainer">
        <img src="https://assets.burberry.com/is/image/Burberryltd/MyAccount.jpg?$BBY_V2_BASIC$&wid=1875&hei=375" alt="" />
        <span >SIGN IN</span>
        </div>
        <div className="formContainer">
            <form  onSubmit={handleSubmit}>
              <h1>ACCOUNT</h1>
              <div className="inputDetails" >
              <input type="text" name="email" placeholder='Enter Your Email...' value={formValues.email} onChange={handleChange}/>
              <p className='error'>{formErrors?.email}</p>
              <input type="password" name="password" placeholder='Enter Your Password...' value={formValues.password} onChange={handleChange}/>
              <p className='error'>{formErrors?.password}</p>
              <button type="submit">SIGN IN</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login
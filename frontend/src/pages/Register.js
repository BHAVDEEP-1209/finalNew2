import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/Register.scss";
import RoleRadio from "../components/RoleRadio";
import google from "../assets/google.svg";
import phone from "../assets/phone.png";
import { SignUp, updateUser } from "../utils/utils";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setValue } from "../slices/userSlice";
import { Link } from 'react-router-dom'
import { Button, notification, Space } from 'antd';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const intialValues = { role: "", name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);

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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //handling errors
    setFormErrors((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // validation
  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.name) {
      errors.name = "Name required!";
    }
    if (!values.role) {
      errors.role = "Role required!";
    }

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

    if (!values.password) {
      errors.password = "Password required!";
    } else if (values.password.length < 6) {
      errors.password = "Password too short!";
    }
    return errors;
  };

  // click on register button
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };



  // validates erros and calls the function when there is no error
  useEffect(() => {
    const setData = async () => {
      try {
        const result = await SignUp(formValues);
        if (result.status == 201) {
          msg = "Success!"
          openNotificationWithIcon('success')
          setTimeout(()=>{
            navigate("/login");
          },500)
        } else {
          msg = "Already Email Exists!"
          openNotificationWithIcon('warning');
        }
      } catch (error) {
        msg = "Error While Signing Up!"
        openNotificationWithIcon('error');
      }
    };
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setData();
    }
  }, [formErrors]);

  return (
    <div className="register">
      {contextHolder}
      <Navbar />
      <Space>
      <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
      </Space>
      <div className="imgContainer">
        <img
          src="https://assets.burberry.com/is/image/Burberryltd/MyAccount.jpg?$BBY_V2_BASIC$&wid=1875&hei=375"
          alt=""
        />
        <span>REGISTER</span>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>ACCOUNT</h1>
          <div className="inputDetails">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name..."
              value={formValues.name}
              onChange={handleChange}
            />
            <p className="error">{formErrors?.name}</p>
            <input
              type="text"
              name="email"
              placeholder="Enter Email/Phn Number..."
              value={formValues.email}
              onChange={handleChange}
            />
            <p className="error">{formErrors?.email}</p>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password..."
              value={formValues.password}
              onChange={handleChange}
            />
            <p className="error">{formErrors?.password}</p>
            <RoleRadio state={{ formValues, setFormValues }} />
            <p className="error">{formErrors?.role}</p>
            <button type="submit">REGISTER</button>
          </div>

        </form>
        <Link to="/">Sign In</Link>
      </div>
    </div>
  );
};

export default Register;

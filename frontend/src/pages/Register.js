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

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const intialValues = { role: "", name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);

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
      errors.email = "Email required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email Address!";
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

  /// google sign in using firebase
  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);


      let userData = {
        name: response.user.displayName,
        email: response.user.email,
        password: "",
        image: response.user.photoURL,
      };

      // / sending user data
      try {
        const result = await SignUp(userData);
        if (result.status == 201) {
          if (!formValues.role) {
            window.alert("enter role!");
            return;
          }

          userData = { ...userData, role: formValues.role};
          try {
            const id = result.data._id;
            const res = await updateUser(id, userData);
            dispatch(setValue(res.data));
            navigate("/homepage");
          } catch (error) {
            console.log(error);
          }
        } else {
          // already exists!

          if (result.data.role == "role") {
            if (!formValues.role) {
              window.alert("enter role!");
              return;
            }
            userData = { ...userData, role: formValues.role };
            try {
              const id = result.data._id;
              const res = await updateUser(id, userData);
              dispatch(setValue(res.data));
              navigate("/homepage");
            } catch (error) {
              console.log(error);
            }
          }else{
            dispatch(setValue(result.data));
            navigate("/homepage")
          }
        }
      } catch (error) {
        window.alert("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // validates erros and calls the function when there is no error
  useEffect(() => {
    const setData = async () => {
      try {
        const result = await SignUp(formValues);
        if (result.status == 201) {
          window.alert("success!");
          navigate("/login");
        } else {
          window.alert("already exists!");
        }
      } catch (error) {
        window.alert("Error");
      }
    };
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setData();
    }
  }, [formErrors]);

  return (
    <div className="register">
      <Navbar />
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
              placeholder="Enter Your Email..."
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
          <div className="otherSignInOptions">
            <div onClick={handleGoogleSignIn}>
              <img src={google} alt="" />
              <span>Google</span>
            </div>
            {/* <div className='div2'>
                
                    <img src={phone} alt="" />
                    <span>Phone</span>
                  
                </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

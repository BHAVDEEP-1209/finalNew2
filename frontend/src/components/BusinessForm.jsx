import React, { useState } from 'react'
import "../Styles/UserForm.scss"
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../utils/utils';
import { setAddress, setBusiness, setValue } from '../slices/userSlice';
import axios from 'axios';
import { Button, notification, Space } from 'antd';
import Loader from "../components/Loader"

const BusinessForm = (props) => {
    const user = useSelector(state=>state.currentUser);
    const business = useSelector(state=>state.business);
    const initial = {brandName : business?.name , brandDescription : business?.desc}
    const [formValues,setFormvalues]  = useState(initial);
    const [name,setName] = useState("");
    const click2 = props.state?.click2;
    const dispatch = useDispatch();

    const [loading,setLoading] = useState(false);
    const [imageLoading,setImageLoading] = useState(false);

      ////////////////////notification
  const [api, contextHolder] = notification.useNotification();
  let msg = useState("");
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: msg,    
    });
  };
  //////////////////////////

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setFormvalues((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }


    const handleSave=async()=>{
        //validation

        setLoading(true);

        const id = user.id
        const add = {
            email : user.email,
            business : {...formValues, logo : business?.logo}
        }
        try {
            const res = await updateUser(id,add);
            dispatch(setBusiness(res.data.business));
            console.log(res.data.business);
            setLoading(false);
            props.state?.setClick2(!click2);

            
        } catch (error) {
          setLoading(false);
            console.log(error);
        }

        
    }


    const handleProfilePic=(e)=>{

        setImageLoading(true);

        const file = e.target.files[0];
       
        let formData = new FormData();
        formData.append("image",file);
        formData.append("id",user.id);
        formData.append("pic","logo");
        axios({
          method: "post",
          url: `http://localhost:5000/auth/updateImage`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {


            msg = "image updated"
            openNotificationWithIcon('success')

            setImageLoading(false);

            dispatch(setBusiness(response.data.business));
          })
          .catch(function (response) {
            //handle error
            setImageLoading(false);
            console.log(response);
          });
    
      }

  return (
    <div className='formContainer'>
        {contextHolder}
        <h1>Edit Business Details</h1>
        <div className='div'>
        <span>Brand Logo</span>
        {
          imageLoading ? <Loader /> :  <input type="file" name="" id="" onChange={handleProfilePic} />
        }
        </div>
        <div className='div'>
        <span>Brand Name</span>
        <input type="text" name="brandName" id="" value={formValues?.brandName} onChange={handleChange} placeholder='Enter Your Brand Name...'/>
        </div>
        <div className='div'>
        <span>Brand Description</span>
        <input type="text" name="brandDescription" id="" placeholder='Tell Us About Your Brand ...' onChange={handleChange} value={formValues?.brandDescription} className='brandDescription'/>

        </div>

        <div className="buttons">
            <button onClick={()=>{
                setFormvalues({});
                props.state?.setClick2(!click2);
            }}>CANCEL</button>
            {
              loading ? <Loader /> : <button onClick={handleSave}>SAVE</button>
            }
        </div>
    </div>
  )
}

export default BusinessForm
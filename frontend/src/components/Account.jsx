import React, { useState } from 'react'
import "../Styles/Store.scss"
import { useDispatch, useSelector } from 'react-redux'
import UserForm from './UserForm';
import axios from 'axios';
import { setValue } from '../slices/userSlice';

const Account = () => {
  const user = useSelector(state=>state.currentUser);
  const dispatch = useDispatch();
  const baseImgUrl = `http://localhost:5000/images/`
  const address = user?.address?.at(0);
  const email = user?.email ? user.email : "**xyz@gmail.com**";
  const name = user?.name ? user.name : "**Bhavdeep kaushal**";
  const number = user?.number ? user.name : "**+91 1234567890**";
  const image = user?.image ? `http://localhost:5000/images/${user?.image}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  const [click,setClick] = useState(false);
  

  // const handleProfilePic=(e)=>{
  //   const file = e.target.files[0];
  //   let formData = new FormData();
  //   formData.append("image",file);
  //   formData.append("id",user.id);
  //   axios({
  //     method: "post",
  //     url: `http://localhost:5000/auth/updateImage/${user.id}`,
  //     data: formData,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //     .then(function (response) {
  //       window.alert("image updated");
  //       console.log(response.data);
  //       // dispatch(setValue(response.data));
  //     })
  //     .catch(function (response) {
  //       //handle error
  //       console.log(response);
  //     });

  // }
  
  return (
    <div className='store'>
      <div className="heading">
      
      <label htmlFor="pic"><img src={image} alt=""/></label>
      
      {/* onChange={handleProfilePic} */}
      <input type="file" name="image" id="pic" style={{display :"none"}} />
      <h1>Account</h1>
      </div>
      { <div className="personal">
          <div className="header">
            <h3>My Details</h3>
            <h3 className='edit' onClick={()=>setClick(!click)}>Edit</h3>
          </div>
           <div className="details">
            <span>Email</span>
            <h4>{email}</h4>
            <span>Name</span>
            <h4>{name}</h4>
            <span>Address</span>
            <h4 className='address'>Street:<span>{address?.street}</span></h4>
            <h4 className='address'>City: <span>{address?.city}</span></h4>
            <h4 className='address'>State: <span>{address?.state}</span></h4>
            <h4 className='address'>PinCode: <span>{address?.pin}</span></h4>
          </div> 
      </div> }

      
        {
          click && <UserForm state={{click,setClick}}/>
        }
      
    </div>
  )
}

export default Account
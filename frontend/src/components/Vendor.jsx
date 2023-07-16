import React, { useState } from 'react'
import {updateUser } from '../utils/utils';
import { Button, notification, Space } from 'antd';

const Vendor = (props) => {
    const image = props.state?.image ? props.state?.image : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    const status = props.state.disabled ? "Disabled" : "Enabled";
    const msg = !props.state.disabled ? "Disabled" : "Enabled";

      ////////////////////notification
  const [api, contextHolder] = notification.useNotification();
  let ms = useState("");
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: ms,    
    });
  };
  //////////////////////////

    const handleDisable=async()=>{
        try {
            const result = await updateUser(props.state._id,{disabled : true});
            ms = msg;
            openNotificationWithIcon('success')
            
            props.st.setClick(!props.st.click);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEnable=async()=>{
        try {
            const result = await updateUser(props.state._id,{disabled : false});

            ms = msg;
            openNotificationWithIcon('success')

            props.st.setClick(!props.st.click);
        } catch (error) {
            console.log(error);
        }
    }
     
  return (
    <div className='vendor'>
        {contextHolder}
        <span>{props.i+1}</span>
        <img src={image} alt="" />
        <div className="info">
        <span className='name'>{props.state.name}</span>
        </div>
        <span className={`${status}`}>{status}</span>
        <div className="buttons">
           {
            props.state.disabled &&  <button className='btn2' onClick={handleEnable}>enable</button>
           }
            {
                !props.state.disabled && <button className='btn1' onClick={handleDisable}>disable</button>
            }
        </div>
    </div>
  )
}

export default Vendor
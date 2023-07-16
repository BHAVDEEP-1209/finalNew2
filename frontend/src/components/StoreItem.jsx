import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../utils/utils';
import { Button, notification, Space } from 'antd';

const StoreItem = (props) => {
    const image = `http://localhost:5000/images/${props.state.images[0]}`
    const navigate = useNavigate();

     ////////////////////notification
  const [api, contextHolder] = notification.useNotification();
  let msg = useState("");
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: msg,    
    });
  };
  //////////////////////////

    const handleView = ()=>{
        const id = props.state._id;
        navigate(`/productDetail/${id}`);
    }
    const handleEdit=()=>{
        const id = props.state._id;
        navigate(`/addProduct/${id}`);
      }
    
      const handleDelete=async()=>{
        try {
          const id = props.state._id;
          const result = await deleteProduct(id);

          msg = "deleted!"
          openNotificationWithIcon('success');

          props.st.setChange(!props.st.change);

        } catch (error) {
          console.log(error);
        }
        
      }
  return (
    <div className='storeItem'>
      {contextHolder}
        <img src={image} alt="" className='img'/>
        <div className="footer">
            <button onClick={handleView}>view</button>
            <button onClick={handleEdit}>edit</button>
            <button onClick={handleDelete}>delete</button>
        </div>
    </div>
  )
}

export default StoreItem
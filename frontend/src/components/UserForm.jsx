import React, { useState } from 'react'
import "../Styles/UserForm.scss"
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../utils/utils';
import { setAddress } from '../slices/userSlice';

const UserForm = (props) => {
    const user = useSelector(state=>state.currentUser);
    const [formValues,setFormvalues]  = useState();
    const click = props.state.click;
    const dispatch = useDispatch();

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
        const id = user.id
        const add = {
            email : user.email,
            address : [formValues]
        }
        try {
            const res = await updateUser(id,add);
            dispatch(setAddress([formValues])); 
            setFormvalues({});
            props.state.setClick(!click);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='formContainer'>
        <h1>Edit Details</h1>
        <div className='div'>
        <span>Email</span>
        <input type="text" name="" id="" value={user.email}/>
        </div>
        <div className='div'>
        <span>Name</span>
        <input type="text" name="" id="" value={user.name}/>
        </div>
        <div className='div'>
        <span>Address</span>
        <input type="text" name="street" id="" placeholder='Enter Street...' onChange={handleChange} value={formValues?.street}/>
        <input type="text" name="city" id="" placeholder='Enter City...' onChange={handleChange} value={formValues?.city}/>
        <input type="text" name="state" id="" placeholder='Enter State...' onChange={handleChange} value={formValues?.state}/>
        <input type="text" name="pin" id="" placeholder='Enter PinCode...' onChange={handleChange} value={formValues?.pin}/>
        </div>

        <div className="buttons">
            <button onClick={()=>{
                setFormvalues({});
                props.state.setClick(!click);
            }}>CANCEL</button>
            <button onClick={handleSave}>SAVE</button>
        </div>
    </div>
  )
}

export default UserForm
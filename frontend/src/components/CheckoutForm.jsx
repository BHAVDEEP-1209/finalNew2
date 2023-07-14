import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/utils';
import { setAddress } from '../slices/userSlice';
import "../Styles/UserForm.scss"

const CheckoutForm = () => {
    const user = useSelector(state=>state.currentUser);
        const [formValues,setFormvalues]  = useState(user?.address?.at(0));
        const [click,setClick] = useState(false);
      
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
            setClick(false);
        } catch (error) {
            console.log(error);
        }
    }

    const dis = click ? "flex" : "none";
    const editDis = click ? "none" : "inline"

  return (
   <>
   <h1>Checkout</h1>
   <div className='formContainer' style={{width : "800px"}}>
        <div className="div"> 
        <div className="head">
        <span>Address</span>
        <span className='edit' onClick={()=>setClick(true)} style={{display : editDis}}>Edit</span>
        </div>
        <input type="text" name="street" id="" placeholder='Enter Street...' onChange={handleChange} value={formValues?.street}/>
        <input type="text" name="city" id="" placeholder='Enter City...' onChange={handleChange} value={formValues?.city}/>
        <input type="text" name="state" id="" placeholder='Enter State...' onChange={handleChange} value={formValues?.state}/>
        <input type="text" name="pin" id="" placeholder='Enter PinCode...' onChange={handleChange} value={formValues?.pin}/>
        </div>

        {/* button */}
        <div className="buttons" style={{display : dis}}>
            <button onClick={()=>{
                setFormvalues({});
                setClick(false);
            }}>CANCEL</button>
            <button onClick={handleSave}>SAVE</button>
        </div>
        {/* button */}
    </div>
   </>
  )
}

export default CheckoutForm
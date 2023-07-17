import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/utils';
import { setAddress } from '../slices/userSlice';
import "../Styles/UserForm.scss"

const CheckoutForm = () => {
    const user = useSelector(state=>state.currentUser);
    const initial = user?.address
        const [formValues,setFormvalues]  = useState({...user?.address});
        const [click,setClick] = useState(false);
        const dispatch = useDispatch();

          // validation fields
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // validation
  const validate = (values) => {
    const errors = {};

    if (!values.street) {
      errors.street = "Street required!";
    }
    if (!values.city) {
      errors.city = "City required!";
    }
    if (!values.city) {
      errors.city = "City required!";
    }
    if (!values.state) {
      errors.state = "State required!";
    }
    if (!values.pin) {
      errors.pin = "Pin-Code required!";
    }
    return errors;
  };

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

        setFormErrors(validate(formValues));
        setIsSubmit(true);

        console.log(formValues);
    }


// validates erros and calls the function when there is no error
  useEffect(() => {
    const setData = async () => {
        const id = user.id
        
        try {
            const res = await updateUser(id,{address : [formErrors]});
            dispatch(setAddress(formValues)); 
            setFormvalues(formValues);
            setClick(false);
        } catch (error) {
            console.log(error);
        } 
    };
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setData();
    }
  }, [formErrors]);



    const dis = click ? "flex" : "none";
    const editDis = click ? "none" : "inline"

  return (
   <>
   <h1>CHECKOUT</h1>
   <div className='formContainer' style={{width : "800px"}}>
        <div className="div"> 
        <div className="head">
        <span>Shipping Address</span>
        <span className='edit' onClick={()=>setClick(true)} style={{display : editDis}}>Edit</span>
        </div>
        <input type="text" name="street" id="" placeholder='Enter Street...' onChange={handleChange} value={formValues?.street} disabled={!click}/>
        <p className="error">{formErrors?.street}</p>
        <input type="text" name="city" id="" placeholder='Enter City...' onChange={handleChange} value={formValues?.city} disabled={!click}/>
        <p className="error">{formErrors?.city}</p>
        <input type="text" name="state" id="" placeholder='Enter State...' onChange={handleChange} value={formValues?.state} disabled={!click}/>
        <p className="error">{formErrors?.state}</p>
        <input type="number" name="pin" id="" placeholder='Enter PinCode...' onChange={handleChange} value={formValues?.pin} disabled={!click}/>
        <p className="error">{formErrors?.pin}</p>
        </div>

        {/* button */}
        <div className="buttons" style={{display : dis}}>
            <button onClick={()=>{
                setFormvalues({...initial});
                setFormErrors({});
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
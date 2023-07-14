import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import "../Styles/CartItem.scss"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart, deleteCartItem, updateCart } from '../utils/utils';
import { useLocation } from 'react-router-dom';

const CartItem = (props) => {
    const product = props.state.product;
    const baseImgUrl = `http://localhost:5000/images/`
    const image = baseImgUrl+`${product.images[0]}`
    const [quan,setQuan] = useState(props.state.quantity);
    const [onLoad,setLoad] = useState(false);
    const [timer,setTimer] = useState(true);
    const location = useLocation().pathname;


    const handleAdd=()=>{
        if(quan<10){
            setQuan(quan+1);
        }
    }

    const handleSub=()=>{
        if(quan>1){
            setQuan(quan-1);
        }
    }

    const handleDelete=async()=>{
        try {
            const del = await deleteCartItem(props.state.id);
            window.alert("item deleted!");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(onLoad){
            const setData = setTimeout(async() => {
                try {
                    const updated = await updateCart(props.state.id,{quantity : quan});
                } catch (error) {
                    console.log(error);
                }
              }, 1000)
          
              return () => clearTimeout(setData)
        }

        setLoad(true);
    },[quan])

  return (
 <>
    <div className='cartItem'>
        <img src={image} alt="" />
        <div className="details">
            <h1>{product?.name}</h1>
            <h1>{product?.description}</h1>
            <h1>{product?.uploadedBy}</h1>
        </div>

        {
            location=="/cart" && <div className="quantity">
            <AddIcon onClick={handleAdd}/>
            <h1>{quan}</h1>
            <RemoveIcon onClick={handleSub}/>
            </div>
        }
        
        <h1>{product?.price}</h1>
        {
            location=="/cart" && <div className="delete" onClick={handleDelete}>
            <DeleteIcon />
        </div>
        }
    </div>
 </>
  )
}

export default CartItem
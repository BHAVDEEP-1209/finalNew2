import React, { useEffect, useState } from 'react'
import "../Styles/Checkout.scss"
import UserForm from '../components/UserForm'
import CheckoutForm from '../components/CheckoutForm'
import { useSelector } from 'react-redux'
import { PlaceOrders, getCartItems } from '../utils/utils'
import CartItem from '../components/CartItem'
import { useNavigate, useParams } from 'react-router-dom'

const Checkout = () => {

  

  const user = useSelector(state=>state.currentUser);
  const [cartItems,setCartItems] = useState([]);
  const {payment} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    const get=async()=>{
      try {
          const items = await getCartItems(user.id);
          setCartItems(items.data);
      } catch (error) {
          console.log(error);
      }
    }
    get();
  },[])

  const placeOrder=()=>{
    const get=async()=>{
      try {
          const items = await PlaceOrders(user.id);
          window.alert("Order Placed!");
          navigate("/orders")
      } catch (error) {
          console.log(error);
      }
    }
    get();
  }


  return (
    <div>
      <CheckoutForm />
      <div className="ordersContainer">
      {
        cartItems?.map((ele,ind)=>{
          return <CartItem state={ele} key={ind}/>
        })
      }
      </div>
      <div className="orderSummary">
        <h1>Order Summary</h1>
        <h3>Order Total : {payment}</h3>
      </div>
      <button onClick={placeOrder}>Place Your Order</button>
    </div>
  )
}

export default Checkout
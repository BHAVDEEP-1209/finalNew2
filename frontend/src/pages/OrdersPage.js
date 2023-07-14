import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getOrders } from '../utils/utils';
import CartItem from '../components/CartItem';

const OrdersPage = () => {
  const user = useSelector(state=>state.currentUser);
  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    const get=async()=>{
      try {
        const result = await getOrders(user.id);
        setOrders(result.data);
      } catch (error) {
        
      }
    }
    get();
  },[])
  return (
    <div>
      {
        orders?.map((ele,ind)=>{
          return <CartItem state={ele} key={ind}/>
        })
      }
    </div>
  )
}

export default OrdersPage
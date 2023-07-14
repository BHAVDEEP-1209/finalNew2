import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCartItems } from '../utils/utils';
import CartItem from '../components/CartItem';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const user = useSelector(state=>state.currentUser);
  const [cartItems,setCartItems] = useState([]);
  const [total,setTotal] = useState(0);
  const [delivery,setDelivery] = useState(200);
  const [cartTotal,setCartTotal] = useState(0);
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  
  const [discount,setDiscount] = useState(0);
  // const [total,setTotal] = useState(0);

  ////////////modal functions
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    // if(user?.address){
    //   setIsModalOpen(true);
    // }else{
    //   window.alert("Add Address!");
      
    // }
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate(`/checkout/${cartTotal}`)
    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  ///////////////////////        

  const handleCoupon=(e)=>{

    if(total==0){
      window.alert("Buy something!");
      return;
    }

    console.log(input)
    if(input=="NODEL"){
      setDelivery(0);
      setCartTotal(cartTotal-delivery);
    }else if(input=="BUMPER"){
      const d = 0.20*total
        setDiscount(d);
        setCartTotal(total+delivery-d);
    }else{
      window.alert("Invalid Coupon!");
    }

    setInput("");
  }

  const handleProceedToBuy=()=>{
    if(total!=0){
      navigate(`/checkout/${cartTotal}`)
      return;
    }
    window.alert("Buy something to Proceed!");
  }

  useEffect(()=>{
    setTotal(0);
    const get=async()=>{
      try {
          const items = await getCartItems(user.id);
          setCartItems(items.data);
          let t = 0;
          {
            items.data?.map((ele)=>{
              
              t = t+(Number(ele.product.price) * Number(ele.quantity));
            })
          }
          console.log(t);
          if(t>0){
          setTotal(t);
          let cartTot = t + delivery - discount;
          setCartTotal(cartTot);
          }
      } catch (error) {
          console.log(error);
      }
    }
    get();
  },[])


  return (
   <>
    <div>
      {
        cartItems?.map((ele,ind)=>{
          return <CartItem state={ele} key={ind}/>
        })
      }
    </div>
    <div className="orderDetails">
    <div className="total">
        <h1>total:{total}</h1>
        <h1>discount:{discount}</h1>
        <h1>delivery:{delivery}</h1>
        <h1>Cart Total : {cartTotal}</h1>
    </div>
    <div className="offers">
      <input type="text" name="coupon" placeholder='enter coupon' value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={handleCoupon}> apply</button>
      <div className="coupons">
        <div className="coupon">
          <h3>NODEL</h3>
          <span>Free shipping on products for exclusive customers!</span>
        </div>
        <div className="coupon">
          <h3>BUMPER</h3>
          <span>20% bumper discount on products!</span>
        </div>
      </div>
    </div>
    <button onClick={handleProceedToBuy}>
      Proceed to Buy
    </button>
   
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
</div>

   </>
  )
}

export default Cart
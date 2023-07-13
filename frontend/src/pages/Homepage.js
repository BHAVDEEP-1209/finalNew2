import React, { useEffect, useRef, useState } from 'react'
import "../Styles/Homepage.scss"
import Navbar from '../components/Navbar'
import Item from '../components/Item'
import plus from "../assets/add.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllProducts } from '../utils/utils'

const Homepage = () => { 
  const user = useSelector(state=>state.currentUser);
  const navigate = useNavigate();
  const [products,setProducts] = useState([]);

  const ref = useRef(null);

  const handleScroll = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(()=>{
    const getVendor=async()=>{
      try {
        const result = (await getAllProducts()).data.products;
        // const temp = result.data.products;
        const temp2  = result.filter((ele)=>{
          return ele?.uploadedBy!= user?.email
        })
        setProducts(temp2);
      } catch (error) {
        console.log(error);
      }
    } 
    getVendor();
  },[])


  return (
    <div className='homepage'>
      <Navbar/>
      <div className="videoDiv">
        <video src="https://lv-vod.fl.freecaster.net/vod/louisvuitton/i1mRN67J9G_HD.mp4" autoPlay loop  id="autoplay" muted/>
        <div className="discover" onClick={handleScroll}>
          <span>Discover Collection</span>
        </div>
      </div>
      <div className="trending" ref={ref}>
        <h1 className='heading'>TRENDING</h1>
        <h5 className='desc'>HOTTEST ITEMS</h5>

        <div className="items">
          {
            products?.map((ele,ind)=>{
              return <Item state={ele} key={ind}/>
            })
          }
          
        </div>
      
      {
        user?.role != "customer" && <img src={plus} alt="" className='plusIcon' onClick={()=>navigate("/addProduct")}/>
      }
      </div>
    </div>  
    
  )
}

export default Homepage
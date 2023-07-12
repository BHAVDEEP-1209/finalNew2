import React, { useEffect, useState } from 'react'
import "../Styles/Store.scss"
import Item from "./Item"
import { getVendorProducts } from '../utils/utils';
import { useSelector } from 'react-redux';

const Store = () => {
  const [products,setProducts] = useState([]);
  const user = useSelector(state=>state?.currentUser);

  useEffect(()=>{
    const getData = async()=>{
      try {
        const result = await getVendorProducts({email : user?.email , savedAs : "product"});
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[])
  return (
    <div className='store'>
        <h1>My Store</h1>
        <div className="items">
           {  
              products?.map((ele,ind)=>{
                return <Item state={ele} key={ind}/>
              })
           }
            
        </div>
    </div>
  )
}

export default Store
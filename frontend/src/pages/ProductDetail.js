import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import "../Styles/ProductDetail.scss"
import { useParams } from 'react-router-dom'
import { getProduct } from '../utils/utils'
import down from "../assets/arrow.svg"
import up from "../assets/up-arrow.svg"

const ProductDetail = () => {
  const {id} = useParams();
  const [product,setProduct] = useState({});
  const baseImgUrl = `http://localhost:5000/images/`
  const [click,setClick] = useState(false);

  useEffect(()=>{
    const get=async()=>{
      try {
        const result = await getProduct(id);
        setProduct(result.data);
    } catch (error) {
        console.log(error);
    }
    }
    get();
  },[])


  const dis = click ? "block" : "none";
  return (  
   <>
   <Navbar />
   <div className='productDetail'>
    <div className="productContainer">
      <div className="imagesDiv">
          {
            product?.images?.map((photo)=>{
              return <img src={baseImgUrl+`${photo}`} alt="" />
              // return <h1>hello</h1>
            })
           
          }
      </div>
      <div className="productInfo">
          <h3>{(product?.category)?.toUpperCase()}</h3>
          <h1>{(product?.name)?.toUpperCase()}</h1>
          <hr />
          <h2>&#x20B9; {product?.price}</h2>
          <span>all taxes and duties included</span>
          <hr />
          <div className="description" onClick={()=>setClick(!click)}>
          <h3>Description</h3>
          {
            click ? <img src={down} alt="" className='downIcon'/> :
            <img src={up} alt="" className='downIcon'/>
          }
          </div>
          
          <div className="descDetail" style={{display : dis}}>
            {product?.description}
          </div>
          <hr />
      </div>
      </div>  
</div>
   </>
  )
}

export default ProductDetail
import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import "../Styles/ProductDetail.scss"
import { useParams } from 'react-router-dom'
import { getProduct } from '../utils/utils'
import down from "../assets/arrow.svg"
import up from "../assets/up-arrow.svg"
import fullStar from "../assets/fullStar.png"
import halfStar from "../assets/halfStar.png"
import info from "../assets/info.png"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const baseImgUrl = `http://localhost:5000/images/`
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [count,setCount] = useState(1);

  useEffect(() => {
    const get = async () => {
      try {
        const result = await getProduct(id);
        setProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, [])


  const dis = click ? "block" : "none";
  const dis2 = click2 ? "block" : "none";
  const dis3 = click3 ? "block" : "none";
  const stock = product.stock>0 ? "In Stock" : "Out Of Stock"

  console.log("product", product);
  return (
    <>
      <Navbar />
      <div className='productDetail'>
        <div className="productContainer">
          <div className="imagesDiv">
            {
              product?.images?.map((photo) => {
                return <img src={baseImgUrl + `${photo}`} alt="" />
                // return <h1>hello</h1>
              })

            }
          </div>
          <div className="productInfo">

            {/* header section */}
            <h3>{(product?.category)?.toUpperCase()}</h3>
            <h1>{(product?.name)?.toUpperCase()}</h1>
            <hr />
            <h2>&#x20B9; {product?.price}</h2>
            <span>all taxes and duties included</span>
            <hr />


            {/* description section */}
            <div className="description" onClick={() => setClick(!click)}>
              <h3>Description</h3>
              {
                !click ? <img src={down} alt="" className='downIcon' /> :
                  <img src={up} alt="" className='downIcon' />
              }
            </div>

            <div className="descDetail" style={{ display: dis }}>
              {product?.description}
            </div>
            {/* <hr /> */}


            {/* review section */}
            <div className="reviewStars">
              <img src={fullStar} alt="" className='fullStar' />
              <img src={fullStar} alt="" className='fullStar' />
              <img src={fullStar} alt="" className='fullStar' />
              <img src={fullStar} alt="" className='fullStar' />
              <img src={halfStar} alt="" className='halfStar' />
              <span>({product.reviews?.length})Reviews</span>
            </div>
            <hr />


            {/* order quantity */}
            <div className="orders">
              <div className="add" onClick={()=>{
                {
                  count >1 && setCount(count-1)
                }
              }}><RemoveIcon /></div>
              <span>{count}</span>
              <div className="add" onClick={()=>setCount(count+1)}><AddIcon /></div>
            </div>


            <div className="description2">
              <h3>Status:</h3>
              <span className='stock'>{stock}</span>
            </div>
            <hr />

            {/* delivery and payments */}
            <div className="description" onClick={() => setClick3(!click3)}>
              <h3>Delivery and Payment</h3>
              {
                !click3 ? <img src={down} alt="" className='downIcon' /> :
                  <img src={up} alt="" className='downIcon' />
              }
            </div>
            <div className="descDetail" style={{ display: dis3 }}>
              <div>
              <img src={info} alt="" /><span>Standard delivery in 2-7 days</span>
              </div>
              <div>
              <img src={info} alt="" /><span>Return costs may vary, depending on the destination.</span>
              </div>
              
              
            </div>
            

            <button ><LocalMallIcon /> Add</button>
          </div>




        </div>
      </div>
    </>
  )
}

export default ProductDetail
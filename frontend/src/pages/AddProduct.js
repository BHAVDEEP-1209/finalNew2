import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "../Styles/AddProduct.scss"
import { addProduct, getProduct, updateProduct } from '../utils/utils'
import axios from 'axios'
import Category from '../components/Category'
import SavedAs from '../components/SavedAs'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const AddProduct = () => {

  const {id} = useParams();

  const user = useSelector(state=>state?.currentUser);
  const [formValues,setFormValues] = useState({category : "watches" , savedAs : "product" , uploadedBy : user?.email});
  const baseImgUrl = `http://localhost:5000/images/`

  const handleChange = (e)=>{
    const {name,value} = e.target;

    setFormValues((prev)=>{
      return {
        ...prev,
        [name] : value
      }
    })
  }

  const handleSubmit =async(e)=>{
    e.preventDefault();

    const name = formValues?.name;
    const desc = formValues?.description;
    const price = formValues?.price;
    const stock = formValues?.stock;
    const files = e.target[4].files;
    const category = formValues?.category;
    const saved = formValues?.savedAs;
    
    console.log(formValues);

    let formData = new FormData();
    {
      for(let i=0;i<files.length;i++){
        formData.append("images",files[i]);
      }
    }
    formData.append("name",name);
    formData.append("description",desc);
    formData.append("price",price);
    formData.append("stock",stock);
    formData.append("category",category);
    formData.append("savedAs",saved);
    formData.append("uploadedBy",user?.email);


    axios({
      method: "post",
      url: "http://localhost:5000/product/createProduct",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setFormValues(response.data);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    
  }

  useEffect(()=>{
    if(id!=undefined){
      const getData=async()=>{
        try {
         const product = await getProduct(id);
         setFormValues(product.data);
        } catch (error) {
         console.log(error);
        }
       }
       getData();
    }
  },[])


  const handleEdit=async(e)=>{
    e.preventDefault();
    
    const name = formValues?.name;
    const desc = formValues?.description;
    const price = formValues?.price;
    const stock = formValues?.stock;
    const files = e.target[4].files;
    const category = formValues?.category;
    const saved = formValues?.savedAs;
    
    console.log(formValues);

    let formData = new FormData();
    {
      for(let i=0;i<files.length;i++){
        formData.append("images",files[i]);
      }
    }
    formData.append("name",name);
    formData.append("description",desc);
    formData.append("price",price);
    formData.append("stock",stock);
    formData.append("category",category);
    formData.append("savedAs",saved);
    formData.append("uploadedBy",user?.email);


    axios({
      method: "post",
      url: `http://localhost:5000/product/updateProduct/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        setFormValues(response.data);
        window.alert("updated!");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  const formSubmit=(e)=>{
    if(id!=undefined){
      handleEdit(e);
    }else{
      handleSubmit(e);
    }
  }


  return (
    <>
      <Navbar />
    <div className='productForm'>
      <form onSubmit={formSubmit}>
        <input type="text" name="name" id="" placeholder='name' value={formValues?.name} onChange={handleChange}/>
        <input type="text" name="description" id="" placeholder='Description' value={formValues?.description} onChange={handleChange}/>
        <input type="number" name="price" id="" placeholder='Price' value={formValues?.price} onChange={handleChange} />
        <input type="number" name="stock" id="" placeholder='Stock' value={formValues?.stock} onChange={handleChange}/>
        <label>Upload multiple profile picture</label>
        <input type="file" name="image" multiple />
        <span>Selected Category:</span>
        <span>{formValues?.category}</span>
        <Category state={{formValues,setFormValues}}/>

        {/* select category  */}
        {/* <label for="category">Choose a category:</label>
        <select name="category" id="category">
        <option value="watches">Watches</option>
        <option value="makeUp">MakeUp</option>
        <option value="jewelry">Jewelry</option>
        <option value="skincare">Skincare</option>
        <option value="fashion">Fashion</option>
        </select> */}
        {/* sadasd */}

        <span>Saved As:</span>
        <span>{formValues?.savedAs}</span>
        <SavedAs state={{formValues,setFormValues}}/>
        <button type="submit">{id!=undefined ? "Edit" : "Submit"}</button>
      </form>

      <div className="imagesPreview">
        {
          formValues?.images!=undefined && <>
          {
            formValues?.images.map((p)=>{
              console.log(p);
              return <img src={baseImgUrl+`${p}`} alt="" />
            })
          }
          </>
        }
      </div>
    </div>
    </>
  )
}

export default AddProduct
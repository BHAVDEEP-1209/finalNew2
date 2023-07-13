import axios from "axios";

export const SignUp = (values) =>(axios.post("http://localhost:5000/auth/register",values));

export const SignIn = (values) =>(axios.post("http://localhost:5000/auth/login",values));

export const getVendorProducts = (values) =>(axios.post("http://localhost:5000/product/getVendorProducts",values));

export const getAllProducts = () =>(axios.get("http://localhost:5000/product/getAllProducts"));

export const deleteProduct = (id) =>(axios.delete(`http://localhost:5000/product/deleteProduct/${id}`))

export const getProduct = (id) =>(axios.get(`http://localhost:5000/product/getProductDetails/${id}`))

export const addToCart = (values) =>(axios.get(`http://localhost:5000/cart/addToCart`,values))

export const updateUser =  (id,values) =>(
    axios.post(`http://localhost:5000/auth/update/${id}`,values)
    );

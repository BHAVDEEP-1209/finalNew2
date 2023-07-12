import axios from "axios";

export const SignUp = (values) =>(axios.post("http://localhost:5000/auth/register",values));

export const SignIn = (values) =>(axios.post("http://localhost:5000/auth/login",values));

export const getVendorProducts = (values) =>(axios.post("http://localhost:5000/product/getVendorProducts",values));

// getAllProducts

export const getAllProducts = () =>(axios.get("http://localhost:5000/product/getAllProducts"));

export const deleteProduct = (id) =>(axios.delete(`http://localhost:5000/product/deleteProduct/${id}`))

// getProductDetails
// updateProduct
export const getProduct = (id) =>(axios.get(`http://localhost:5000/product/getProductDetails/${id}`))


// export const updateProduct = (id,data) =>(axios.put(`http://localhost:5000/product/updateProduct/${id}`,{...data}))


// export const addProduct = (values) =>(axios.post("http://localhost:5000/product/createProduct",
// {data: values},
// {headers: { "Content-Type": "multipart/form-data" }},
// ));

// export const addProduct = (values) =>(axios.post("http://localhost:5000/product/createProduct",
// {values},
// ));
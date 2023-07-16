import axios from "axios";

export const SignUp = (values) =>(axios.post("http://localhost:5000/auth/register",values));

export const SignIn = (values) =>(axios.post("http://localhost:5000/auth/login",values));

export const getVendorProducts = (values) =>(axios.post("http://localhost:5000/product/getVendorProducts",values));

////admin
// getAdminProducts
export const getAdminProducts = (values) =>(axios.post("http://localhost:5000/product/getAdminProducts",values));

export const getVendorsList = () =>(axios.get("http://localhost:5000/auth/getVendorsList"));

//getVendorsList

/// get Admin Orders
export const getAdminOrders = () =>(axios.get("http://localhost:5000/cart/getAdminOrders"));

// getting order History for admin
export const getAdminOrdersHistory = () =>(axios.get("http://localhost:5000/cart/getAdminOrdersHistory"));


///////////

export const getAllProducts = () =>(axios.get("http://localhost:5000/product/getAllProducts"));

export const deleteProduct = (id) =>(axios.delete(`http://localhost:5000/product/deleteProduct/${id}`))

export const getProduct = (id) =>(axios.get(`http://localhost:5000/product/getProductDetails/${id}`))

export const addToCart = (values) =>(axios.post(`http://localhost:5000/cart/addToCart`,values))

// updateCart
export const  updateCart = (id,values) =>(axios.post(`http://localhost:5000/cart/updateCart/${id}`,values))

//deleteCartItem
export const deleteCartItem = (id) =>(axios.delete(`http://localhost:5000/cart/deleteCartItem/${id}`))

// getCartItems
export const getCartItems = (id) =>(axios.get(`http://localhost:5000/cart/getCartItems/${id}`))

// PlaceOrders
export const PlaceOrders = (id) =>(axios.get(`http://localhost:5000/cart/PlaceOrders/${id}`))

///getOrders
export const getOrders = (id) =>(axios.get(`http://localhost:5000/cart/getOrders/${id}`))

///update order status
export const updateOrderStatus = (id,values) =>(axios.post(`http://localhost:5000/cart/updateOrderStatus/${id}`,values))

export const updateUser =  (id,values) =>(
    axios.post(`http://localhost:5000/auth/update/${id}`,values)
    );


    // createProduct 
export const createProduct = (values) =>(axios.post(`http://localhost:5000/product/createProduct`,values))


export const getVendorOrders = (values) =>(axios.post(`http://localhost:5000/cart/getVendorOrders`,values))


export const updateProduct = (id,values) =>(axios.post(`http://localhost:5000/product/updateProduct/${id}`,values))


// getOrderHistory
// getHistory
export const getHistory = (values) =>(axios.post(`http://localhost:5000/cart/getHistory`,values))

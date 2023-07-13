const express = require("express");
const router = express.Router();
const Cart = require("../models/CartModel")


router.post("/addToCart",async(req,res)=>{
    // try {

    //     const cartItem = await Cart.create({...req.body});
    //     res.status(201).json(cartItem);
    //    }

    //  catch (error) {
    //     return res.status(500).json("Error while adding to cart!");
    // }

    console.log(req.body.product._id,req.body.purchasedBy);
})


module.exports=router;
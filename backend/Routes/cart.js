const express = require("express");
const router = express.Router();
const Cart = require("../models/CartModel")


router.post("/addToCart",async(req,res)=>{

    try {
        const item  = await Cart.find({id : req.body.id});
        let data = {...req.body};

        if(item.length>0){
            const q = item[0].quantity + req.body.quantity;
            data = {...data , quantity : q};
            console.log(q)
            console.log(data)
           const updated = await Cart.deleteOne({id : req.body.id});
        }
            const cartItem = await Cart.create({...data});
            res.status(201).json(cartItem);

       }

     catch (error) {
        return res.status(500).json("Error while adding to cart!");
    }
})

router.get("/getCartItems/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const items = await Cart.find({purchasedAs : "cart" , purchasedBy : id});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json("Error while getting data!");
    }
})

///update cart item
router.post("/updateCart/:id",async(req,res)=>{
    
    try {
        const id = req.params.id;
        const item = await Cart.findOne({id : id});
        const updated = await Cart.updateOne({id : id},
            {$set : { "quantity" : req.body.quantity} }
            )
       }

     catch (error) {
        return res.status(500).json("Error while adding to cart!");
    }

    // console.log(req.body.quantity);
})


router.delete("/deleteCartItem/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const del = await Cart.deleteOne({id : id});
        res.status(201).json("item deleted");
    }catch (error) {
        return res.status(500).json("Error while adding to cart!");
    }
})




////////////////// Place Orders

router.get("/PlaceOrders/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const items = await Cart.find({purchasedAs : "cart" , purchasedBy : id});
        {
            items?.map(async(item)=>{
                await Cart.updateOne({id : item.id},
                { $set : { "purchasedAs" : "order" }   }
                );
            })
        }

        

        res.status(200).json("order placed");
    } catch (error) {
        res.status(500).json("Error while getting data!");
    }
   
})


////////////////
// get Placed order
router.get("/getOrders/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const items = await Cart.find({purchasedAs : "order" , purchasedBy : id});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json("Error while getting data!");
    }
})



module.exports=router;
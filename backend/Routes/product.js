const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


//////////////////////
const Product = require("../models/productModel");
const multer = require("multer");

// for image uploading!
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        return cb(null,"./public/images")
    },
    filename : function (req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({storage});

router.post("/createProduct",upload.array("images",4),async(req,res)=>{
    const files = req.files;
    const imagesArray = [];
    {
        for(let i=0;i<files.length;i++){
            imagesArray.push(files[i].filename);
        }
    }
      const product = {
        ...req.body,
        images:imagesArray
    }

    const result = await Product.create({...product});
    res.status(200).json(result);    
});
////////////////////////////////

router.post("/updateProduct/:id",upload.array("images",4),async(req,res)=>{
    
    const id = req.params.id;
    
    let product = await Product.findById(id);

    if(!product){
        res.status(500).json("Product not found");
    }
    const files = req.files;


  if(files.length==0){
        product = await Product.findByIdAndUpdate(id,req.body,{
        new: true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json(product);
  }else{
    const imagesArray = [];
    {
        for(let i=0;i<files.length;i++){
            imagesArray.push(files[i].filename);
        }
    }
      const prod = {
        ...req.body,
        images:imagesArray
    }
    product = await Product.findByIdAndUpdate(id,prod,{
        new: true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json(product);

  }
    
    
})


router.get("/getAllProducts",productController.getAllProducts);
// router.post("/createProduct",productController.create);
// router.put("/updateProduct/:id",productController.updateProduct);
router.delete("/deleteProduct/:id",productController.deleteProduct);
router.get("/getProductDetails/:id",productController.getProductDetails);
router.post("/getVendorProducts",productController.getVendorProducts);

module.exports=router;
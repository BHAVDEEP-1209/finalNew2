const Product = require("../models/productModel");
// const multer = require("multer");

// // for image uploading!
// const storage = multer.diskStorage({
//     destination : function (req,file,cb){
//         return cb(null,"./public/images")
//     },
//     filename : function (req,file,cb){
//         return cb(null,`${Date.now()}-${file.originalname}`)
//     }
// })


// const upload = multer({storage});

// //create products
// exports.create = upload.array("images",4),async(req,res)=>{
//     // const product = await Product.create(req.body);
//     // res.status(201).json(product);
   
//     console.log("hello");
// }

// get all Products
exports.getAllProducts = async(req,res)=>{

    const productCount = await Product.countDocuments();

    // search is done but filter and pagination is not done!
    // searching the products!
    const q = req.query.keyword;
    if(q){
        
        const products = await Product.find({name : { $regex : q , $options : "i"}});
        res.status(200).json({products, productCount});
    }
    else{
        const products = await Product.find();
        res.status(200).json({products, productCount});
    }
}


//updation
// exports.updateProduct = async(req,res,next)=>{
    
//     const id = req.params.id;
    
//     let product = await Product.findById(id);

//     if(!product){
//         res.status(500).json("Product not found");
//     }

//     product = await Product.findByIdAndUpdate(id,req.body,{
//         new: true,
//         runValidators : true,
//         useFindAndModify : false
//     })

//     res.status(200).json(product);
    
// }


//deletion
exports.deleteProduct = async(req,res,next)=>{
    
    const id = req.params.id;
    
    let product = await Product.findById(id);

    if(!product){
        res.status(500).json("Product not found");
    }

     await Product.deleteOne({_id : id});

    res.status(200).json("Product deleted successfully!"); 
}


// get Product details

exports.getProductDetails = async(req,res,next)=>{
    
    const id = req.params.id;
    let product = await Product.findById(id);

    if(!product){
        res.status(500).json("Product not found");
    }

    res.status(200).json(product); 
}


// get Vendor Products
exports.getVendorProducts = async(req,res)=>{
    try {
        const products = await Product.find({uploadedBy : req.body.email , savedAs : req.body.savedAs})

        if(products){
            return res.status(200).json(products);
        }
        return res.status(204).json("No Products Yet!")
    } catch (error) {
        return res.status(500).json("Error while fetching data");
    }

    
}
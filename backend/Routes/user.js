const express = require("express");
const router = express.Router();


///////////// image uploading!
const User = require("../models/userModal");
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

const authController = require("../controllers/userController");

router.post("/register",authController.register);
router.post("/login",authController.login);
router.post("/update/:id",authController.update);

// router.post("/updateImage/:id",upload.single("image"),async(req,res)=>{
//     const id = req.body.id;
//     const image = req.file.filename;
//     try {
        
//         const id = req.params.id;
//         const user = await User.findById(id);
        
//         if(!user){
//             return res.status(204).json("No such email exists");
//         }
//         const newUser = await User.findByIdAndUpdate(id,{image : image });
//         console.log("newUser",newUser);
        
//         return res.status(201).json(newUser);
//     } catch (error) {
//         return res.status(400).send("error while updating User!");
//     }

  
// })

module.exports = router;
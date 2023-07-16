const User = require("../models/userModal");


// register
exports.register = async(req,res)=>{
    try {
        
        const user = await User.findOne({email : req.body.email});
        
        if(user){
            return res.status(203).json(user);
        }
        const newUser = await User.create({...req.body});
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).send("error while signing up!");
    }
    
    
}

exports.getVendorsList = async(req,res)=>{
    try {
        console.log("getting!")
        const items = await User.find({role : "vendor"});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json(error.message)
    }
}


// update User
exports.update = async(req,res)=>{
    try {
        const id = req.params.id;
        const newUser = await User.findByIdAndUpdate(id , {...req.body});
        res.status(201).json(newUser);
        
    } catch (error) {
        res.status(500).json("Error while updating user!");
    }
}




/// login 
exports.login = async(req,res)=>{
        
    try {
        const user = await User.findOne({email : req.body.email});
        console.log(user);
        if(!user){
            return res.status(204).json("No such user exists!");
        }

        if(user.password!=req.body.password){
            return res.status(205).json("wrong password!");
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).send("error while signing up!");
    }

   
}


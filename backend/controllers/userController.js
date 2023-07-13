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


// update User
exports.update = async(req,res)=>{
    try {
        
        const id = req.params.id;
        const user = await User.findOne({email : req.body.email});
        
        if(!user){
            return res.status(204).json("No such email exists");
        }
        const newUser = await User.findByIdAndUpdate(id,{...req.body});
        console.log(newUser)
        
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).send("error while updating User!");
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


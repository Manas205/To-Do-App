const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const registerUser=async(req,res)=>{
    try {
        const{name,email,password}=req.body
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({message:"Email already existed"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(200).json({message:"User created successfully"})
    } catch (error) {
        console.error("Register error:", error.message) 
        return res.status(500).json(error.message)
    }
}
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid credentials"})
        }
        const id1=user._id
        const token=jwt.sign(
            {id:user._id},
            "xxcv",
            {expiresIn:"7d"}
        )
        res.cookie("token",token,{
            httpOnly:true,
            //secure:true,
            maxAge:1000*60*60*24*7
        })
        res.status(200).json({
            message:"login successfull"
        })
    }catch (error) {
    console.error("Login error:", error.message) 
    res.status(500).json({message:"Server Error"})
}
}
const logoutUser=async(req,res)=>{
    try {
        res.cookie("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        res.status(400).json({message:"problem in logging out"})
    }
}
module.exports={registerUser,loginUser,logoutUser}


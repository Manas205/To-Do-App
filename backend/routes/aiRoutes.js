const express=require('express')
const suggestSteps=require('../Controllers/aiControllers.js')
const router=express.Router()
router.post("/suggest",suggestSteps)
module.exports=router
const express = require('express');
const register = require('../model/registerSchema');
const router=express.Router();

 router.get('/register', async(req,res)=>{
 const p = await register.find();
 res.send(p)
})

router.get('/register/:id',async(req,res)=>{
    const id = req.params.id;
    const p=await register.findOne({'_id':id})
    res.send(p)
})
router.delete('/register/:id',async(req,res)=>{
  const id=req.params.id;
  const p=await register.findOne({'_id':id})
  const d=await register.deleteOne(p)
  res.send(d)
})

router.put('/register/:id',async(req,res)=>{
    const id=req.params.id;
    const data=req.body;
    const p = await register.updateOne({'_id':id},data)
    res.send(p);
})
router.post("/register",async(req,res)=>{
    const p = new register(req.body)
    await p.save();
    res.send(p);
})

module.exports=router








const express = require('express');
const profile = require('../model/profileSchema');
const router=express.Router();

 router.get('/profile', async(req,res)=>{
 const p = await profile.find();
 res.send(p)
})

router.get('/profile/:id',async(req,res)=>{
    const id = req.params.id;
    const p=await profile.findOne({'_id':id})
    res.send(p)
})
router.delete('/profile/:id',async(req,res)=>{
  const id=req.params.id;
  const p=await profile.findOne({'_id':id})
  const d=await profile.deleteOne(p)
  res.send(d)
})

router.put('/profile/:id',async(req,res)=>{
    const id=req.params.id;
    const data=req.body;
    const p = await profile.updateOne({'_id':id},data)
    res.send(p);
})


router.post("/profile",async(req,res)=>{
    const p = new profile(req.body)
    await p.save();
    res.send(p);
})

module.exports=router








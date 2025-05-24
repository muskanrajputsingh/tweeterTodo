const express = require('express');
const detail = require('../model/tweetSchema');
const router=express.Router();

 router.get('/detail', async(req,res)=>{
 const p = await detail.find();
 res.send(p)
})

router.get('/detail/:id',async(req,res)=>{
    const id = req.params.id;
    const p=await detail.findOne({'_id':id})
    res.send(p)
})
router.delete('/detail/:id',async(req,res)=>{
  const id=req.params.id;
  const p=await detail.findOne({'_id':id})
  const d=await detail.deleteOne(p)
  res.send(d)
})

router.put('/detail/:id',async(req,res)=>{
    const id=req.params.id;
    const data=req.body;
    const p = await detail.updateOne({'_id':id},data)
    res.send(p);
})


router.post("/detail",async(req,res)=>{
    const p = new detail(req.body)
    await p.save();
    res.send(p);
})

module.exports=router







//   router.post('/detail', async (req, res) => {
//     try {
//       const { content, date } = req.body;
//       const newTweet = new detail({
//         content,
//         date,
//       });
//       const savedTweet = await newTweet.save();
//       res.status(201).json(savedTweet);
//     } catch (error) {
//       console.error('Error adding tweet:', error);
//       res.status(400).json({ message: 'Failed to add tweet' });
//     }
//   });

//   router.put('/detail/:id',async(req,res)=>{
//     const id=req.params.id;
//     const { content,date}=req.body;
//     const data={
//         content,
//         date,
//     }
//     const p = await detail.updateOne({'_id':id},data)
//     res.send(p);
// })

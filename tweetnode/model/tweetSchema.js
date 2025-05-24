const mongoose=require('mongoose');

const tweetSchema=mongoose.Schema({

     content:{
        type: String,
        required: true
      },
      imag:{
        type:String,
      },
      tweetDate: {
        type: Date,
        default: Date.now
      },
    
})
const tweetmodel = mongoose.model('tweets',tweetSchema);
module.exports = tweetmodel
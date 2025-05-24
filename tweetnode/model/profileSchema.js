const mongoose=require('mongoose');

const ProfileSchema=mongoose.Schema({

     
      imag:{
        type:String,
      },
      profileDate: {
        type: Date,
        default: Date.now
      },
    
})
const profilemodel = mongoose.model('profile',ProfileSchema);
module.exports = profilemodel
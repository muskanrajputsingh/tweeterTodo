const mongoose=require('mongoose');

const RegisterSchema=mongoose.Schema({

     
      username:{
        type:String,
        required: true
      },
      email:{
        type:String,
        required: true
      },
      phone:{
        type:String,
        required: true
      },
      password:{
        type:String,
        required: true
      },
      profileDate: {
        type: Date,
        default: Date.now
      },
    
})
const Registermodel = mongoose.model('register',RegisterSchema);
module.exports = Registermodel
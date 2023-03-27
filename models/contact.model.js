const mongoose=require("mongoose")

require("dotenv").config()


const contactSchema=new mongoose.Schema({
   username:{
    type:String,
    required:true
   },
   phone:{
    type:Number,
    required:true,
   },
   user:{
      type:mongoose.Types.ObjectId,
      ref:"user"
   }

     

})


const ContactModel=mongoose.model('contact',contactSchema)

module.exports={ContactModel}
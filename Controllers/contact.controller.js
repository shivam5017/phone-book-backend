require("dotenv").config();

const { ContactModel } = require("../models/contact.model");
const { UserModel } = require("../models/user.model");

// ** Contact adding
async function AddContact(req, res) {
  const payload = req.body;
  try {
    const contact = new ContactModel(payload);
    
    await contact.save();
   
    await UserModel.findOneAndUpdate(
      { _id: payload.user },
      { $push: { contacts: contact._id } }
    );
  
    res.status(201).json({ status: 200, message: "Contact saved success" });
  } catch (error) {
    res.send({ message: "Something went wrong", error });
  }
}

async function GetContact(req, res) {
  try {
    let contacts = await ContactModel.find({ user: req.body.user });
    res.status(201).send({ status: 200, message: "Fetched Success", contacts });
  } catch (error) {
    
    res.status(400).send({ message: error.message, err: "not fetched" });
  }
}

async function UpdateContact(req,res){
  const id = req.params.id;
  
  const payload = req.body;
 const value={
   username:payload.value.username,
   phone:payload.value.phone
 }

  try{
   
 let contact= await ContactModel.findByIdAndUpdate({ _id: id},value);

  await contact.save();
 
  
    res.status(200).send({ message: " Contact is updated " });
  }
  catch(error){
    res.status(400).send({message:error.message,err:"Not found"})
  }
}

async function DeleteContact(req,res){
  const id = req.params.id;
  const payload = req.body;
 
  try{
   
  await ContactModel.findByIdAndDelete({ _id: id });

 
  await UserModel.findByIdAndUpdate(
    { _id:payload.user},
    { $pull: { contacts:id} }
  );
    
  
    res.status(200).send({ message: " Contact is removed " });
  }
  catch(error){
    res.status(400).send({message:error.message,err:"Not found"})
  }
}

module.exports = {
  AddContact,
  GetContact,
  DeleteContact,
  UpdateContact
};

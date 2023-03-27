
// routes

const express = require("express");
const ContactRouter = express.Router();
const contact_controller = require("../Controllers/contact.controller")



ContactRouter.post("/add", contact_controller.AddContact);
ContactRouter.get("/get",contact_controller.GetContact)
ContactRouter.delete("/delete/:id",contact_controller.DeleteContact)
ContactRouter.patch("/update/:id",contact_controller.UpdateContact)
module.exports = ContactRouter;

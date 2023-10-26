const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET all /api/contacts
//@access public  
const getContacts = asyncHandler(async (req,res) => {
    // console.log(req.body);
    var contacts = '';
    if(req.params.name)
    {
        contacts = await Contact.find({"name":req.params.name});
    }
    else
    {
        contacts = await Contact.find();
    }
    if(!contacts)
    {
        res.status(400);
        return "No Contact found"
    }

    res.status(200).json(contacts);
});

//@desc Create  contacts
//@route POST all /api/contacts
//@access public  
const createContacts = asyncHandler( async (req, res) => {
    console.log("Request:", req.body);
    // return;
    const {name,email,phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const contacts = await Contact.create({
        name,
        email, 
        phone
    });

    res.status(201).json(contacts);
});

//@desc Create  contacts
//@route PUT all /api/contacts
//@access public  
const updateContacts = asyncHandler( async (req, res) => {
    console.log("Request:", req.body);

    if(req.params.name)
    {
        const contacts = await Contact.find({"name":req.params.name});
        // console.log(contacts); return;
        for (const contact of contacts)
        {
            if(contact)
            {
                // console.log(contact.name)
                var updateContactByName = await Contact.findByIdAndUpdate(
                    contact.id,
                    req.body,
                    req.body,
                    {new: true}
                );
            }
        }
    }

    res.status(200).json({updateContactByName });
});

const deleteContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({"name":req.body.name});
    if(!contacts)
    {
        res.status(400);
        throw new Error("Contact unfound !");
    }
    await Contact.remove();
    res.status(200).json({"message": `COntact Deleted for id: ${contacts.name}`});
});

module.exports = {getContacts, createContacts, updateContacts, deleteContacts};
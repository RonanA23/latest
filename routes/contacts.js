const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {check, validationResult} =require('express-validator')
const User = require('../models/User')
const Contact = require('../models/Contact')


// get api/contacts- get all users contacts- private
router.get('/', auth,async(req, res) => {
  try{
    const contacts= await ContactItem.find({user:req.user.id}).sort({date:-1})
    res.json(contacts)
  } catch(err){
    console.error(err.message)
    res.status(500).send('server error')
  }
});

// add new contacts
router.post('/',[auth,[check('name','name is required').Not().isEmpty()],
],async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {name,email,phone,type}= req.body

  try{const newContact = new Contact({
    name,
    email,
    phone,
    type,
    user:req.user.id
  })
    const contact= await newContact.save()
    res.json(contact)}
    catch(err){console.error(err.message)
    res.status(500).sned('Server Error')}
});

//update api/contacts/;id
router.put('/:id',auth,async(req, res) => {
  const {name,email,phone,type}= req.body

  const contactFields={}
  if(name) contactFields.name=name
  if(email) contactFields.name=email
  if(phone) contactFields.name=phone
  if(type) contactFields.name=type

  try{
    let contact= await Contact.findById(req.params.id)

  if(!contact)return res.status(404).json({msg:'no contact'})

if(contact.user.toString()!== req.user.id){
  return res.status(401).json({msg:'unauthorized'})
}
  contact = await Contact.findByIdAndUpdate(req.params.id,
    {$set:contactFields},{new:true},)

    res.json(contact)}
    catch(err){
      console.error(err.message)
    res.status(500).send('Error')}
});

router.delete('/:id',auth,async (req, res) => {
  try{
    let contact =await Contact.findById(req.params.id)

  if(!contact)return res.status(400).json({msg:'no contact'})

  if(contact.user.toString()!== req.user.id){
    return res.status(401).json({msg:'not allowed'})
  }
  
    await Contact.findByIdAndRemove(req.params.id)
    res.json({msg:'contact removed'})
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

module.exports = router;

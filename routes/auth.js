const express = require('express');
const { check,validationResult } = require('express-validator');
const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require("bcryptjs")
const config = require('config')
const auth =require('../middleware/auth')


// get api/auth- get logged in user- private
router.get('/', auth,async(req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password')
    res.json(user);
  } catch(err){
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

router.post('/',[
  check('email','add email').isEmail(),
  check('password','enter password').exists()
] ,
async(req, res) => {
  const errors =validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {email,password}= req.body

  try{
    let user = await User.findOne({email})

    if(!user){
      return res.status(400).json({msg:'invalid credentials'})
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(400).json({msg:'invalid credentials'})
    }
    const payload = {
      user:{
        id:user.id
      }
    }
    JsonWebTokenError.toString(
      payload,
      config.get('jwtSecret'),
      {expiresIN:36000},
      (err,token)=>{
        if(err)throw err
        res.json({token})
      }
    )
  } catch(err){
    console.error(err.message)
    res.status(500).send('server error')
  }
});

module.exports = router;

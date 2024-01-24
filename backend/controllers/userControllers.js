require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require ("jsonwebtoken");

const checkPassword = async (plainPassword, hashedPassword) => {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      console.error('Error checking password:', error);
      return false;
    }
};
const newToken = (user) => {
    const payload = {
        email: user.email,
    };
    const options = {
      expiresIn: '10d',
    };
    const secret = process.env.JWT_SECRET;
  
    return jwt.sign(payload, secret, options);
};
const signUpUser = async (req, res) => {
    const {email, fullName, password} = req.body;
    if (!email || !fullName || !password){
        res.status(500).send('Please Enter all the Feilds');
    }
    try {
        const userExists= await User.findOne({ email }).select("-password");
        if (userExists){
            res.send('Email already exists');
            return;
        }

        const hash = await bcrypt.hash(password, 10);
    
        await User.create({...req.body, password: hash});
        res.status(201).send('Sucessfully account opened ');
        return;
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).send('Error in the backend');
        return;
    }
}

const signInUser = async (req, res) => {
    const {password, email} = req.body;
    if (!password){
      res.status(400).send('Enter password');
      return;
    }

    try {
      const user = await User.findOne({email})
      if (!user) {
        res.status(400).send('You have to Sign up first !');
        return;
      }
  
      const same = await checkPassword(password, user.password);

      if (same) {
        let token = newToken(user)
        res.status(200).send({status: 'ok', token})
        return
      }
      res.status(400).send( 'InValid password !');
      return;
    } catch (err) {
      console.log('ERROR', err)
      res.status(500).send(`Error ${err}`);
    }
  }
const getUser = async (req, res) => {
    res.status(200).send(req.user);
}

module.exports = {signUpUser, signInUser, getUser, checkPassword, newToken};
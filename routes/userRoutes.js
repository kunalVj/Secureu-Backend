const express = require('express');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', async(req, res) => {
    try{
        let {username, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        password = await bcrypt.hash(password, 10);

        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    }
    catch(err){
        res.status(500).json({message: 'Server error', error: err.message});
    }
});


router.post('/login', async(req, res) => {
    const {username, password} = req.body;

    try{
        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({message: 'Invalid Password'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).json({message: 'User logged in successfully', token});
    }
    catch(err){
        res.status(500).json({message: 'Server error', error: err.message});
    }
});

router.post('/logout', authMiddleware, (req, res) => {
    res.status(200).json({message: 'User logged out successfully'});
});

module.exports = router;

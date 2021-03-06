const express = require('express')
const request = require('request')
const router = express.Router()
const config = require('config');
const auth = require('../middleware/auth')
const Profile = require('../models/Profile')
const User = require('../models/User')
const {check , validationResult } = require ('express-validator')
const jwt = require('jsonwebtoken')

//@route    GET profile/me
//@desc     Get current user's profile
//@access   Private

router.get('/me',auth, async (req,res)=> {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar'])

        if(!profile)
        {
            return res.status(400).json({ msg: 'There is no profile for this user'})
        }

        res.json(profile)

    }catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router
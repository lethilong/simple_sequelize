const db = require('../models');
const sendToken = require('../utils/sendToken');

const User = db.users;

exports.register = async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        sendToken(newUser, 201, res);
    } catch(err) {
        if(err.errors){
            res.status(400).json({
                success: false,
                message: err.errors[0].message
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        res.status(400).json({
            success: false,
            message: 'Please provide username and password'
        })
        return;
    }

    const user = await User.findOne({where: {username: username}});

    if(!user) {
        res.status(401).json({
            success: false,
            message: 'User not found'
        })
        return;
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: 'Wrong password'
        })
        return;
    }

    sendToken(user, 201, res);
}

exports.logout = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}
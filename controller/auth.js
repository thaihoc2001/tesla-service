const {Users} = require('../model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const isAuthenticated = async (req, res, next) => {
    try {
        const access_token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(access_token, config.AUTH_TOKEN_SECRET.ACCESS_TOKEN);
        if (user){
            if (user.role !== 'ADMIN'){
                return res.status(400).json({success: false, message: "you do not have access"});
            }
            return next();
        }
        return res.status(401).json({message: 'user not exist'});
    }catch (err) {
        return res.status(401).json(err);
    }
}
const loginUser = async (req, res) => {
    try {
        const {phone, password} = req.body;
        if (!phone || !password) {
            return res.status(400).json({success: false, message: 'Incorrect login details'});
        }
        const user = await Users.findOne({where: {phone: phone}});
        if (!user){
            return res.status(400).json({message: 'user not exits'});
        }
        let isCorrectPass = await bcrypt.compare(password, user.password);
        if (!isCorrectPass){
            return res.status(400).json({message: 'Incorrect password'});
        }
        const accessToken = signAccessToken(user.id,user.role);
        const refreshToken = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            config.AUTH_TOKEN_SECRET.REFRESH_TOKEN,
            {
                expiresIn: '24h'
            }
        )
        return res.status(200).json({accessToken: accessToken,refreshToken: refreshToken});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const signAccessToken = (user_id,role) => {
    return jwt.sign(
        {
            id: user_id,
            role: role
        },
        config.AUTH_TOKEN_SECRET.ACCESS_TOKEN,
        {
            expiresIn: '1h'
        }
    );
}
const changePassword = async (req, res) => {
    try{
        const user_id = req.user.id;
        const {old_password,password} = req.body;
        const user = await Users.findByPk(user_id);
        if (!old_password || !password) {
            return res.status(400).json("Incorrect information");
        }else {
            const isCorrectPass = await bcrypt.compare(old_password, user.password);
            if (!isCorrectPass){
                return res.status(400).json({message: "Incorrect password"});
            }else {
                const hashPassword = await bcrypt.hash(password,10);
                await Users.update({
                    password: hashPassword,
                },{
                    where: {id: user_id}
                });
                return res.status(200).json({success: true});
            }
        }
    }catch (err){
        return res.status(400).json(err);
    }
}
const refreshTokenUser = async (req, res) => {
    try {
        const {token} = req.body;
        const user = jwt.verify(token,config.AUTH_TOKEN_SECRET.REFRESH_TOKEN);
        const accessToken = signAccessToken(user.id,user.role);
        return res.status(200).json({accessToken: accessToken});
    }catch (err) {
        return res.status(400).json({message: err.toString()});
    }
}

module.exports = {
    isAuthenticated,
    loginUser,
    refreshTokenUser,
    changePassword
}

const {Users, Account} = require('../model');
const bcrypt = require('bcryptjs')
const getCustomer = async (req, res) => {
    try {
        const options = {
            where: {role: 'customer'}
        }
        const users = await Users.findAll(options);
        return res.status(200).json(users);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getUser = async (req, res) => {
    try{
        const user_id = req.user.id;
        const options = {
            where: {id: user_id}
        }
        const user = await Users.findOne(options);
        return res.status(200).json(user);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const createUser = async (req, res) => {
    try {
        const {first_name,last_name,phone,address,password, ward_id} = req.body;
        const user_phone = await Users.findOne({where: {phone: phone}});
        if (user_phone){
            return res.status(400).json({success: false, message: "phone exists!"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await Users.create({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            address: address,
            ward_id: ward_id,
            role: 'ADMIN'
        });
        if(!user) throw Error('Error!');
        const account = await Account.create({
            user_id: user.id,
            password: hashPassword
        })
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json({success: false, message: err.toString()});
    }
}
module.exports = {
    getUser,
    createUser,
    getCustomer
}

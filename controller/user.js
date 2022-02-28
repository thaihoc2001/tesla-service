const {Users, Account} = require('../model');
const bcrypt = require('bcryptjs')
const getUser = async (req, res) => {
    try {
        const users = await Users.findAll();
        return res.status(200).json(users);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const createUser = async (req, res) => {
    try {
        const {first_name,last_name,phone,address,password} = req.body;
        const user_phone = await Users.findOne({where: {phone: phone}});
        if (user_phone){
            return res.status(400).json({success: false, message: "phone exists!"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const account = await Account.create({
            password: hashPassword
        })
        const user = await Users.create({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            address: address,
            account_id: account.id,
            role: 'ADMIN'
        });
        if(!user) throw Error('Error!');
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json({success: false, message: err.toString()});
    }
}
module.exports = {
    getUser,
    createUser
}

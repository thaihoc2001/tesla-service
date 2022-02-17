const {ProductType} = require('../model');

const createProductType = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'ADMIN'){
            return res.status(400).json({success: false, message: "you do not have access"});
        }
        const {name, description} = req.body;
        await ProductType.create({
            name,
            description
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getProductType = async (req, res) => {
    try {
        const categories = await ProductType.findAll();
        if (!categories) throw Error("Error!");
        return res.status(200).json(categories);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const updateProductType = async (req, res) => {
    try {
        const user = req.user;
        const {productType_id} = req.params;
        if (user.role !== "ADMIN"){
            return res.status(400).json({success: false, message: "you do not have access"});
        }
        const productType = await ProductType.findByPk(productType_id);
        if (!productType) {
            return res.status(400).json({success: false, message: "Product-type not exists"})
        }
        const {name, description} = req.body;
        await ProductType.update({
            name: name || productType.name,
            description: description || productType.description
        },{
            where: {id: productType_id}
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const deleteProductType = async (req, res) => {
    try {
        const user = req.user;
        const {productType_id} = req.params;
        if (user.role !== "ADMIN") {
            return res.status(400).json({success: false, message: "you do not have access"});
        }
        const category = await ProductType.findByPk(productType_id);
        if (!category) {
            return res.status(400).json({success: false, message: "category not exists"})
        }
        await ProductType.destroy({
            where: {id: productType_id}
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
module.exports = {
    createProductType,
    getProductType,
    updateProductType,
    deleteProductType
}

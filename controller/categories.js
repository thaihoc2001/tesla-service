const {Categories,Products} = require('../model');
const {deleteProduct} = require('./product');
const createCategory = async (req, res) => {
    try {
        const {name, description} = req.body;
        await Categories.create({
            name,
            description
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getCategory = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        if (!categories) throw Error("Error!");
        return res.status(200).json(categories);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const updateCategory = async (req, res) => {
    try {
        const {category_id} = req.params;
        const category = await Categories.findByPk(category_id);
        if (!category) {
            return res.status(400).json({success: false, message: "category not exists"})
        }
        const {name, description, status} = req.body;
        await Categories.update({
            name: name || category.name,
            description: description || category.description,
            status: status || category.status
        },{
            where: {id: category_id}
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const deleteCategory = async (req, res) => {
    try {
        const user = req.user;
        const {category_id} = req.params;
        const category = await Categories.findByPk(category_id);
        if (!category) {
            return res.status(400).json({success: false, message: "category not exists"})
        }
        const products = await Products.findAll({where: {category_id: category_id}});
        if (products) {
            for (let product of products){
                await deleteProduct(product.id);
            }
        };
        await Categories.destroy({
            where: {id: category_id}
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}

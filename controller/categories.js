const {Categories} = require('../model');

const createCategory = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'ADMIN'){
            return res.status(400).json({success: false, message: "you do not have access"});
        }
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
        const user = req.user;
        const {category_id} = req.params;
        if (user.role !== "ADMIN"){
            return res.status(400).json({success: false, message: "you do not have access"});
        }
        const category = await Categories.findByPk(category_id);
        if (!category) {
            return res.status(400).json({success: false, message: "category not exists"})
        }
        const {name, description} = req.body;
        await Categories.update({
            name: name || category.name,
            description: description || category.description
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
        if (user.role !== "ADMIN") {
            return res.status(400).json({success: false, message: "you do not have access"});
        }
        const category = await Categories.findByPk(category_id);
        if (!category) {
            return res.status(400).json({success: false, message: "category not exists"})
        }
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

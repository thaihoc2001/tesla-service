const {Images} = require('../model');

const cloudinary = require('../utils/clouddinary');

const createImages = async (files,product_id) => {
    for (const file of files){
        const result = await cloudinary.uploader.upload(file.path);
        if (file.fieldname === 'image_thumbnail') {
            await Images.create({
                url: result.secure_url,
                cloudinary_id: result.public_id,
                type: 'Main',
                product_id: product_id
            })
        }else {
            await Images.create({
                url: result.secure_url,
                cloudinary_id: result.public_id,
                type: 'Secondary',
                product_id: product_id
            })
        }
    }
}

const deleteImage = async (req, res) => {
    try {
        const {image_id} = req.body;
        await deleteImageCloudinary(image_id);
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const deleteImageCloudinary = async (image_id) => {
    const image = await Images.findByPk(image_id);
    await cloudinary.uploader.destroy(image.cloudinary_id);
    await Images.destroy({where: {id: image_id}});
}
const updateImage = async (req, res) => {
    try {
        const file = req.file;
        const {image_id} = req.params;
        const result = await cloudinary.uploader.upload(file.path);
        const image = await Images.findByPk(image_id);
        await cloudinary.uploader.destroy(image.cloudinary_id);
        await Images.update({
            url: result.secure_url,
            cloudinary_id: result.public_id,
        }, {
            where: {id: image_id}
        })
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const deleteImageOfProduct = async (product_id) => {
    const images = await Images.findAll({where: {product_id: product_id}});
    for (let image of images) {
        await cloudinary.uploader.destroy(image.cloudinary_id);
        await Images.destroy({where: {id: image.id}});
    }
}
const addImage = async (req, res) => {
    try {
        const {product_id} = req.body;
        const file = req.file;
        const result = await cloudinary.uploader.upload(file.path);
        await Images.create({
            url: result.secure_url,
            cloudinary_id: result.public_id,
            type: 'Secondary',
            product_id: product_id
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
module.exports = {
    createImages,
    deleteImage,
    deleteImageCloudinary,
    updateImage,
    addImage,
    deleteImageOfProduct
}

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
module.exports = {
    createImages
}

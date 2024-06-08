import Product from "../models/productSchema.js";

export const createProduct = async (req, res, next) => {
    console.log('Creating a product');
    try {
        console.log(req.body);
        // const sizeAvailableString = req.body.size_available;
        // const trimmedString = sizeAvailableString.replace(/^['"]|['"]$/g, '');      
        // const sizeAvailableObject = JSON.parse(trimmedString.replace(/'/g, '"'));
        // const sizeAvailableMap = new Map(Object.entries(sizeAvailableObject));
        // req.body.size_available=sizeAvailableMap;
        // req.body.image=req.image_url;
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        next(error.message);
    }
};

import Product from "../models/productSchema.js";
import { errorHandler } from "../utils/error.js";



export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw errorHandler(400, "NO Product Found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getCategoricalProduct = async (req, res, next) => {
  try {
    const category = req.query.category;
    const limit = parseInt(req.query.limit) || 12;
    const product = await Product.find({ category: category }).limit(limit);

    res.json(product);
  } catch (error) {
    next(error);
  }
};



import Product from "../models/productSchema.js";
import { errorHandler } from "../utils/error.js";

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(errorHandler(404, "NO Product With This Id"));

    // const productSizes = Object.fromEntries(product.size_available);

    // for (const size in productSizes) {
    //   if (!(size in req.body.size_available)) {
    //     req.body.size_available[`${size}`] = productSizes[size];
    //   }
    // }

    const upadatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(upadatedProduct);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    console.log("Creating Product",req.body,req.user)
    req.body['owner']=req.user.id;
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    next(error.message);
  }
};

export const viewProducts = async (req, res, next) => {
    try {
        console.log(req.body)
        const user = req.body.id;
        const limit=parseInt(req.query.limit) || 10;
        const min_price=parseInt(req.query.min)||0;
        const max_price=parseInt(req.query.max)|| Number.MAX_SAFE_INTEGER;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const order=req.query.ord|| 'asc';
        const sort=req.query.sort||'createdAt';
        const discount=req.query.dis||'false';
        const category=req.query.cate||'all';
        const search=req.query.search||"";
        const query={
          owner:user,
          
          new_price:{$gte:min_price,$lte:max_price},
          discount:discount
        };
        if(search!=""){
          query.name={ $regex: search, $options: "i" },
          console.log(search)
        }
        if(category!='all'){
          query.category=category;
        };
        console.log(query)
        const data= await Product.find(query)
        .limit(limit)
        .sort({[sort]:order})
        .skip(startIndex);

        console.log(data)
        res.json(data);
    } catch (error) {
     next(error)   
    }
};

export const deleteProduct=async(req,res,next)=>{
  try {
    const {id}=req.body;
    const response=await Product.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}

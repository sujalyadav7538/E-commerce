import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 1,
        min: 0,
        max: 5
    },
    discount: {
        type: Boolean,
        default: false
    },
    new_price: {
        type: Number,
        required: function() { return this.discount },
        min: 1
    },
    images:{
      type:[String],
      required:false,
      min:0,
      max:6
    },
    old_price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true
    },
    size_available: {
        type: Map,
        of: Number,
        required: false,
        
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
},
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;

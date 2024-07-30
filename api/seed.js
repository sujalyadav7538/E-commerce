import  DatabaseConnection from './middlewares/database.js';
import all_product from './../client/public/Assets/all_product.js';
import Product from './models/productSchema.js';


await DatabaseConnection();

const id="66641aabfd0341aa0f879420"
const alterProduct=(id)=>{
    all_product.map((product,index)=>{
        product["owner"]=id
    })
}



const SeedDatabase=async(all_product)=>{

    await Product.deleteMany();
    try {
        const del= await Product.deleteMany();
        await alterProduct(id);
        const res= await Product.insertMany(all_product);
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}

SeedDatabase(all_product);




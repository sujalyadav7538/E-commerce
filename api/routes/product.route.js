import express from 'express';
import { getProduct,getCategoricalProduct} from '../controller/product.controller.js';
import { verifyToken } from './../utils/verifyUser.js';

const router=express.Router();

router.get('/getProduct',getCategoricalProduct)
router.get('/getProduct/:id',getProduct)




export default router;
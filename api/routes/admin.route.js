import express from 'express';
import { createProduct, deleteProduct, updateProduct, viewProducts } from '../controller/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyToken,createProduct);
router.post('/updateProduct/:id',updateProduct);
router.post('/views',verifyToken,viewProducts);
router.post('/delete',verifyToken,deleteProduct);


export default router;
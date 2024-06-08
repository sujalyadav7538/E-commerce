import express from 'express';
import { createProduct } from '../controller/product.controller.js';
import { verifyToken } from './../utils/verifyUser.js';

const router=express.Router();

router.post('/create',verifyToken,createProduct);
router.post('/update/:id',)

export default router;
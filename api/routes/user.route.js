import express from 'express';
import { signup, login, addToCart, updateToCart ,getCart, deleteCartItem,LogOut} from './../controller/user.controller.js';
import { verifyToken } from './../utils/verifyUser.js';

const router=express.Router();

router.post('/singup',signup)
router.post('/login',login)
router.post('/cart/add',verifyToken,addToCart);
router.post('/cart/update',verifyToken,updateToCart);
router.post('/cart/get',verifyToken,getCart);
router.post('/cart/delete',verifyToken,deleteCartItem);
router.post('/logout',verifyToken,LogOut);
export default router;
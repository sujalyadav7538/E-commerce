import express from 'express';
import { signup, login } from './../controller/user.controller.js';
import { verifyToken } from './../utils/verifyUser.js';

const router=express.Router();

router.post('/singup',signup)
router.post('/login',login)

export default router;
import User from './../models/userSchema.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from './../utils/error.js';
import Product from './../models/productSchema.js';
export const signup = async (req, res, next) => {
    try {
        const { useremail, username, password } = req.body;
        if (!useremail || !password || !username) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({ username, useremail, password: hashedPassword });
        await newUser.save();

        const { password: pass, ...rest } = newUser._doc;
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });

        res.cookie('access_token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',  // Use secure only in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 3600000  // 1 hour in milliseconds
        }).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { useremail, password } = req.body;
        if (!useremail || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are both required.' });
        }

        const validUser = await User.findOne({ useremail });
        if (!validUser) return res.status(404).json({ success: false, message: 'User not found!' });

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return res.status(401).json({ success: false, message: 'Wrong credentials!' });

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',  // Use secure only in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 3600000  // 1 hour in milliseconds
        }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// Adding Cart Item
export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const user = await User.findById(userId);
      const product = await Product.findById(productId);
  
      if (!user || !product) {
        return res.status(404).json({ message: 'User or Product not found' });
      }
  
      user.cartItems.push({ product_id: productId, quantity });
  
      await user.save();
      const cart = await Promise.all(
        user.cartItems.map(async (item) => {
          const product = await Product.findById(item.product_id);
          return {
            product,
            quantity: item.quantity,
            cartId:item._id,

          };
        })
      );
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Update Cart Item

export const updateToCart=async(req,res,next)=>{
    try {
        const { userId, productId, quantity } = req.body;
        console.log("Updating Cart",productId,quantity)
        const user = await User.findById(userId);
        const product = await Product.findById(productId);
    
        if (!user || !product) {
          return res.status(404).json({ message: 'User or Product not found' });
        };

        const cartItemIndex = user.cartItems.findIndex(item => item.product_id.toString() === productId);
        if (cartItemIndex > -1) {
            user.cartItems[cartItemIndex].quantity = parseInt(quantity) ;
          } else {
           throw errorHandler(402,'Items NOT Found !!')
        }
          await user.save();
          const cart = await Promise.all(
            user.cartItems.map(async (item) => {
              const product = await Product.findById(item.product_id);
              return {
                product,
                quantity: item.quantity,
                cartId:item._id,

              };
            })
          );
          res.status(200).json(cart);



    } catch (error) {
        next(error)
    }
}

// Get Cart

export const getCart = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const cart = await Promise.all(
        user.cartItems.map(async (item) => {
          const product = await Product.findById(item.product_id);
          return {
            product,
            quantity: item.quantity,
            cartId:item._id,

          };
        })
      );
  
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  };

export const deleteCartItem=async(req,res,next)=>{
    try {
        const {userId,cartId}=req.body;
        const user=await User.findById(userId);
        if(!user){throw errorHandler(404,'No User Found')};
        const newCart=user.cartItems.filter(item=>item._id!=cartId);
        user.cartItems=newCart;
        await user.save();
        const cart = await Promise.all(
            user.cartItems.map(async (item) => {
              const product = await Product.findById(item.product_id);
              return {
                product,
                quantity: item.quantity,
                cartId:item._id,
              };
            })
          );
        res.status(200).json(cart);
    } catch (error) {
        next(error)
    }
}
  
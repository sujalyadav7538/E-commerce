import User from './../models/userSchema.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    console.log('Registering User!');
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
        console.log("LOGGED IN !!");

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

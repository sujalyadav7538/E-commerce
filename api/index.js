import express from 'express';
import path from 'path';
import DatabaseConnection from './middlewares/database.js';
import productRoute from './routes/product.route.js';
import bodyParser from 'body-parser';
import userRoute from './routes/user.route.js';
import adminRoute from './routes/admin.route.js';
import dotenv from 'dotenv';
import upload from './middlewares/multer.js';
import uploadOnCloud from './utils/cloudinary.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({ path: "./.env" });

const app = express();

// Connect to MongoDB Atlas
await DatabaseConnection();

const __dirname = path.resolve();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = ['*'];

app.use(cors({
    origin: function (origin, callback) {
        // Log the incoming origin
        console.log('Origin:', origin);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            console.log('Request has no origin (likely a server-to-server or curl request). Allowing.');
            return callback(null, true);
        }

        // Check if the origin is in the allowedOrigins array
        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log('Allowed by CORS:', origin);
            callback(null, true); // Allow the request
        } else {
            console.log('Not allowed by CORS:', origin);
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    credentials: true, // Enable credentials (cookies, authorization headers, TLS client certificates)
}));




app.get('/api/cookie-tester', (req, res, next) => {
    try {
        if (req.cookies.access_token == undefined) {
            return res.json("");
        }
        res.json(req.cookies.access_token);
    } catch (err) {
        next(err);
    }
});

app.post('*/upload', upload.fields([{ name: 'product_image', maxCount: 6 }]), uploadOnCloud);

app.use('/api/product', productRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));


// Serve the index.html file for any unknown routes
app.get('*', (req, res) => {
    console.log(path.join(__dirname, '../client/dist/index.html'))
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(3000, () => {
    console.log(__dirname)
    console.log('Listening on PORT 3000!');
});

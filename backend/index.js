const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins, or specify frontend URL e.g. 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);


// Your routes here
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const reviewPurchaseRoutes = require('./routes/reviewPurchaseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const customFormRoutes = require('./routes/customFormRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/review-purchases', reviewPurchaseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/custom-forms', customFormRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

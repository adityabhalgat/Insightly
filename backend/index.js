const express = require('express');
const connectDB = require('./config/db');
//const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Your routes here
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
//const companyRoutes = require('./routes/companyRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const reviewPurchaseRoutes = require('./routes/reviewPurchaseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const customFormRoutes = require('./routes/customFormRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
//app.use('/api/company', companyRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/review-purchases', reviewPurchaseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/custom-forms', customFormRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);

// Use error handling middleware (should be after routes)
//app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

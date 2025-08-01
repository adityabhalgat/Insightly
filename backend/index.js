const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // <-- just import, don't redeclare

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
app.use('/api/payment', paymentRoutes);
app.use('/api/custom-forms', customFormRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/products', productRoutes);

// Swagger UI route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
const PORT = process.env.PORT || 5001;
const swaggerJSDoc = require('swagger-jsdoc');
const frontendURL = process.env.FRONTEND_URL;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TnP_PBL API',
      version: '1.0.0',
      description: 'API documentation for TnP_PBL backend',
    },

    servers: [
      {
        url: `${frontendURL}}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // Scan all route files for Swagger comments
};

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

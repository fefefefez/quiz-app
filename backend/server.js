import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';

// Load environment variables based on the .env file
// This is useful for local development and testing
console.log('TEST_LOAD :', process.env.TEST_LOAD)




process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const result = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
if (result.error) {
    console.log('Error loading .env file:', result.error);
}

console.log('Environment:', process.env.NODE_ENV );
// Connect to MongoDB
console.log("Using MongoDB URI: ", process.env.MONGODB_URI);
connectDB();

// Initialize express
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json()); // Pour lire  les requêtes JSON

// Routes
app.use('/api/questions', questionRoutes);


app.get('/', (req, res) => {
    res.send('API Quiz Geo en ligne...');
    });


// Launch server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
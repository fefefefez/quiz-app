import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express
const app = express();
app.use(cors());
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
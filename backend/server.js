import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';

// Load environment variables
dotenv.config({
	path: `.env.${process.env.NODE_ENV || 'development'}`
});

// Connect to MongoDB
connectDB();

// Initialize express
const app = express();
const allowedOrigins = process.env.CORS_ORIGIN?.split(',');

app.use(cors({ origin :  function (origin, callback){
			if(!origin || allowedOrigins.includes(origin)) 
			{
				callback(null,true);
			}
			else {
				callback(new Error('Not allowed by CORS'));
			}
}}));
app.use(express.json()); // Pour lire  les requêtes JSON

// Routes
app.use('/api/questions', questionRoutes);


app.get('/', (req, res) => {
    res.send('API Quiz Geo en ligne...');
    });


// Launch server
const PORT = process.env.PORT || 5002;
app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
    });

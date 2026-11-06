import express from 'express';
import { connectToMongoDB, disconnectFromMongoDB } from './dbMongo.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDB();

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log('Servern lyssnar och är kopplad till Mongo');
});

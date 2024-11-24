import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db';
import rideRoutes from './routes/rideRoutes';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api', rideRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

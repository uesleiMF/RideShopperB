import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB conectado!');
  } catch (err) {
    console.error('Erro ao conectar com MongoDB:', err);
    process.exit(1);
  }
};

import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Ansluten till MongoDB Atlas via Mongoose');
  } catch (err) {
    console.error('Kunde inte ansluta till MongoDB', err);
    process.exit(1);
  }
}

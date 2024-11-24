import mongoose, { Schema, Document } from 'mongoose';

interface Driver extends Document {
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  pricePerKm: number;
}

const driverSchema = new Schema<Driver>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  vehicle: { type: String, required: true },
  rating: { type: Number, required: true },
  pricePerKm: { type: Number, required: true }
});

const DriverModel = mongoose.model<Driver>('Driver', driverSchema);

export default DriverModel;

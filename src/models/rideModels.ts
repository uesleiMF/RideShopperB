import mongoose, { Schema, Document } from 'mongoose';

interface Ride extends Document {
  customerId: string;
  origin: string;
  destination: string;
  driverId: string;
  distance: number;
  duration: string;
  value: number;
  date: Date;
}

const rideSchema = new Schema<Ride>({
  customerId: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  driverId: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const RideModel = mongoose.model<Ride>('Ride', rideSchema);

export default RideModel;

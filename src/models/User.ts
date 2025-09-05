import mongoose, { Schema, Document } from 'mongoose';

interface IAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: number;
  address?: IAddress;
  createdAt?: Date;
  updatedAt?: Date;
}

const addressSchema: Schema = new Schema({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
});

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    phone: { type: String, trim: true },
    age: { type: Number, min: 0 },
    address: { type: addressSchema, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);

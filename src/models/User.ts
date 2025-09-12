import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  age?: number;
  address?: IAddress;
  createdAt?: Date;
  updatedAt?: Date;

  comparePassword(userPassword: string): Promise<boolean>;
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
    password: { type: String, minlength: 6 },
    phone: { type: String, trim: true },
    age: { type: Number, min: 0 },
    address: { type: addressSchema, required: false },
  },
  { timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);

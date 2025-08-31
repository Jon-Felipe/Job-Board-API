import mongoose, { Schema, Document } from 'mongoose';

interface IJob extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  salaryFrom: number;
  salaryTo: number;
  employmentType:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Internship'
    | 'Freelance';
  skillsRequired: string[];
  remote: boolean;
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  industry: string;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salaryFrom: { type: Number, required: true, min: 0 },
    salaryTo: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (this: IJob, value: number) {
          return value >= this.salaryFrom;
        },
        message: 'salaryTo must be greater than or equal to salaryFrom',
      },
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
      required: true,
    },
    skillsRequired: [{ type: String, required: true }],
    remote: { type: Boolean, required: true },
    experienceLevel: {
      type: String,
      enum: ['Entry', 'Mid', 'Senior'],
      required: true,
    },
    industry: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>('Job', JobSchema);

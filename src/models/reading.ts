import mongoose, { Schema, Document } from 'mongoose';
  
  export interface IReading extends Document {
    userQuestion: string;
    questionType: string;
    timeFrame: string;
    spreadType: string;
    confirmStatus: boolean;
    cards: Array<{
      name: string;
      position: string;
      placement: string;
      meaning: string;
    }>;
    createdAt: Date;
  }
  
  const ReadingSchema = new Schema({
    userQuestion: { type: String, required: true },
    questionType: { type: String, required: true },
    timeFrame: { type: String, required: true },
    spreadType: { type: String, required: true },
    confirmStatus: { type: Boolean, default: false },
    cards: [{
      name: String,
      position: String,
      placement: String,
      meaning: String
    }],
    createdAt: { type: Date, default: Date.now }
  });
  
  export const Reading = mongoose.models.Reading || mongoose.model<IReading>('Reading', ReadingSchema);
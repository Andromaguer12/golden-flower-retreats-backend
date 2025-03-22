/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck: here are no errors
import mongoose, { model, Schema } from 'mongoose';
import { UserProgress } from '../../../typesDefs/models/userProgress/types';

// creating schema
const userProgressSchema = new Schema(
  {
    feelLevel: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default model<Partial<UserProgress>>('UserProgress', userProgressSchema);

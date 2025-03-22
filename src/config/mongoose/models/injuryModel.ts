/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck: here are no errors
import mongoose, { connect, model, Schema } from 'mongoose';
import { Injury } from '../../../typesDefs/models/injuryModelsModel/types';

// creating schema
const injuryModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    treatment: {
      type: String,
      required: true,
    },
    body_part_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BodyPart',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    exercises: [
      {
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

export default model<Partial<Injury>>('Injury', injuryModelSchema);

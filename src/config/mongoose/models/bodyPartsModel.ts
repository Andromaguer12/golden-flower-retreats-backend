/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck: here are no errors
import mongoose, { connect, model, Schema } from 'mongoose';
import { BodyPart } from '../../../typesDefs/models/bodyPartsModel/types';

// creating schema
const bodyPartSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<Partial<BodyPart>>('BodyPart', bodyPartSchema);

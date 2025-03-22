/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck: here are no errors
import { model, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../../../typesDefs/models/users/types';
import { Gender } from '../../../typesDefs/models/users/enum';

// creating schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: Gender,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = (await bcrypt.hash(this.password, salt)).toString();
});

export default model<Partial<UserDocument>>('User', userSchema);

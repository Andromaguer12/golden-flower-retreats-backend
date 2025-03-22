/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import UserProgress from '../../config/mongoose/models/userProgressModel';
import { UserProgress as UserProgressType } from '../../typesDefs/models/userProgress/types';

const ObjectId: any = mongoose.Types.ObjectId;

/**
 * saves an userProgress instance
 * @param {Object} userProgress
 * @returns userProgress
 */
async function saveUserProgress(userProgress: any) {
  return userProgress.save();
}

/**
 * used for get a single userProgress by id
 * @param {String} id
 * @returns a single userProgress or an error
 */
async function getUserProgressById(id?: string): Promise<UserProgressType | { error: boolean; message: string }> {
  const userProgress = await UserProgress.findOne({ _id: id });

  if (!userProgress) return { error: true, message: 'Error: error getting the userProgress' };

  return userProgress as unknown as Promise<UserProgressType>;
}

/**
 * used for get a single userProgress by email
 * @param {String} id
 * @returns a single userProgress or an error
 */
async function getUserProgressByEmail(email?: string): Promise<UserProgressType | null> {
  const userProgress = await UserProgress.findOne({ email });

  if (!userProgress) return null;

  return userProgress as UserProgressType;
}

/**
 * used for get a single userProgress by email and authenticates with password
 * @param {String} id
 * @returns a single userProgress or an error
 */
async function findUserProgressByEmail(email: string, password: string) {
  const userProgress: any = await UserProgress.findOne({ email });

  if (!userProgress) return { error: true, message: 'Error: error getting the userProgress' };

  if (userProgress && (await userProgress.matchPassword(password))) {
    delete userProgress.password;
    return userProgress;
  }

  return null;
}

/**
 * This function create a userProgress note
 * @param {String} owner
 * @param {String} body
 * @returns
 */
async function createUserProgress(
  feelLevel: number,
  message: string,
  user_id: string,
): Promise<UserProgressType | { error: boolean; message: string }> {
  const currentData: UserProgressType = {
    feelLevel,
    message,
    user_id,
  };

  const userProgressCreated = new UserProgress(currentData);

  const validationError = userProgressCreated.validateSync();
  if (validationError) {
    return { error: true, message: validationError.message };
  }

  const saved = await saveUserProgress(userProgressCreated);

  return saved;
}

/**
 * function to update a single userProgress
 * @param {Object} body
 * @param {String} id
 * @returns updated data
 */
async function updateUserProgress(body: UserProgressType, id: string) {
  try {
    return UserProgress.updateOne({ _id: id }, body);
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

/**
 * function to delete a single userProgress
 * @param {String} id
 * @returns object
 */
async function deleteUserProgress(id: string) {
  try {
    return UserProgress.deleteOne({ _id: id });
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

async function findUserProgressExist(id: string) {
  const exists = await UserProgress.exists({ _id: id });

  if (!exists) return { error: true, message: 'Error: error getting the userProgress' };

  return;
}

async function getAllUserProgressByUser(userId: string) {
  return UserProgress.aggregate([
    {
      $match: {
        user_id: new ObjectId(userId),
      },
    },
    {
      $project: {
        _id: 1,
        feelLevel: 1,
        message: 1,
        createdAt: 1,
      },
    },
  ]);
}

async function getAllUserProgress() {
  return UserProgress.find();
}

export default {
  createUserProgress,
  deleteUserProgress,
  getUserProgressById,
  updateUserProgress,
  findUserProgressExist,
  findUserProgressByEmail,
  getUserProgressByEmail,
  getAllUserProgress,
  getAllUserProgressByUser,
};

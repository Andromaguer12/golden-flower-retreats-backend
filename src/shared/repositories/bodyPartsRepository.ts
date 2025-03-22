/* eslint-disable @typescript-eslint/no-explicit-any */
import BodyParts from '../../config/mongoose/models/bodyPartsModel';
import { BodyPart } from '../../typesDefs/models/bodyPartsModel/types';

/**
 * saves an bodyParts instance
 * @param {Object} bodyParts
 * @returns bodyParts
 */
async function saveBodyParts(bodyParts: any) {
  return bodyParts.save();
}

/**
 * used for get a single bodyParts by id
 * @param {String} id
 * @returns a single bodyParts or an error
 */
async function getBodyPartsById(id?: string): Promise<BodyPart | { error: boolean; message: string }> {
  const bodyParts = await BodyParts.findOne({ _id: id });

  if (!bodyParts) return { error: true, message: 'Error: error getting the bodyParts' };

  return bodyParts as unknown as Promise<BodyPart>;
}

/**
 * used for get a single bodyParts by email
 * @param {String} id
 * @returns a single bodyParts or an error
 */
async function getBodyPartsByEmail(email?: string): Promise<BodyPart | null> {
  const bodyParts = await BodyParts.findOne({ email });

  if (!bodyParts) return null;

  return bodyParts as BodyPart;
}

/**
 * used for get a single bodyParts by email and authenticates with password
 * @param {String} id
 * @returns a single bodyParts or an error
 */
async function findBodyPartsByEmail(email: string, password: string) {
  const bodyParts: any = await BodyParts.findOne({ email });

  if (!bodyParts) return { error: true, message: 'Error: error getting the bodyParts' };

  if (bodyParts && (await bodyParts.matchPassword(password))) {
    delete bodyParts.password;
    return bodyParts;
  }

  return null;
}

/**
 * This function create a bodyParts note
 * @param {String} owner
 * @param {String} body
 * @returns
 */
async function createBodyParts(
  name: string,
  description: string,
  image: string,
): Promise<BodyPart | { error: boolean; message: string }> {
  const currentData: BodyPart = {
    name,
    description,
    image,
  };

  const bodyPartsCreated = new BodyParts(currentData);

  const validationError = bodyPartsCreated.validateSync();
  if (validationError) {
    return { error: true, message: validationError.message };
  }

  const saved = await saveBodyParts(bodyPartsCreated);

  return saved;
}

/**
 * function to update a single bodyParts
 * @param {Object} body
 * @param {String} id
 * @returns updated data
 */
async function updateBodyParts(body: BodyPart, id: string) {
  try {
    return BodyParts.updateOne({ _id: id }, body);
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

/**
 * function to delete a single bodyParts
 * @param {String} id
 * @returns object
 */
async function deleteBodyParts(id: string) {
  try {
    return BodyParts.deleteOne({ _id: id });
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

async function findBodyPartsExist(id: string) {
  const exists = await BodyParts.exists({ _id: id });

  if (!exists) return { error: true, message: 'Error: error getting the bodyParts' };

  return;
}

async function getAllBodyParts() {
  return BodyParts.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
      },
    },
  ]);
}

export default {
  createBodyParts,
  deleteBodyParts,
  getBodyPartsById,
  updateBodyParts,
  findBodyPartsExist,
  findBodyPartsByEmail,
  getBodyPartsByEmail,
  getAllBodyParts,
};

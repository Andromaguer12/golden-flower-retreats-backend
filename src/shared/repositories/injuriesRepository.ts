/* eslint-disable @typescript-eslint/no-explicit-any */
import Injuries from '../../config/mongoose/models/injuryModel';
import { Excercises, Injury } from '../../typesDefs/models/injuryModel/types';

/**
 * saves an injuries instance
 * @param {Object} injuries
 * @returns injuries
 */
async function saveInjuries(injuries: any) {
  return injuries.save();
}

/**
 * used for get a single injuries by id
 * @param {String} id
 * @returns a single injuries or an error
 */
async function getInjuriesById(id?: string): Promise<Injury | { error: boolean; message: string }> {
  const injuries = await Injuries.findOne({ _id: id });

  if (!injuries) return { error: true, message: 'Error: error getting the injuries' };

  return injuries as unknown as Promise<Injury>;
}

/**
 * used for get a single injuries by email
 * @param {String} id
 * @returns a single injuries or an error
 */
async function getInjuriesByBodyPart(bodyPart?: string): Promise<Injury[] | null> {
  const injuries = await Injuries.find({ body_part_id: bodyPart });

  if (!injuries) return null;

  return injuries;
}

/**
 * used for get a single injuries by email
 * @param {String} id
 * @returns a single injuries or an error
 */
async function getInjuriesByEmail(email?: string): Promise<Injury | null> {
  const injuries = await Injuries.findOne({ email });

  if (!injuries) return null;

  return injuries as Injury;
}

/**
 * used for get a single injuries by email and authenticates with password
 * @param {String} id
 * @returns a single injuries or an error
 */
async function findInjuriesByEmail(email: string, password: string) {
  const injuries: any = await Injuries.findOne({ email });

  if (!injuries) return { error: true, message: 'Error: error getting the injuries' };

  if (injuries && (await injuries.matchPassword(password))) {
    delete injuries.password;
    return injuries;
  }

  return null;
}

/**
 * This function create a injuries note
 * @param {String} owner
 * @param {String} body
 * @returns
 */
async function createInjuries(
  name: string,
  description: string,
  image: string,
  treatment: string,
  body_part_id: string,
  excercises: Excercises[],
): Promise<Injury | { error: boolean; message: string }> {
  const currentData: Injury = {
    name,
    description,
    image,
    treatment,
    body_part_id,
    exercises: excercises,
  };

  const injuriesCreated = new Injuries(currentData);

  const validationError = injuriesCreated.validateSync();
  if (validationError) {
    return { error: true, message: validationError.message };
  }

  const saved = await saveInjuries(injuriesCreated);

  return saved;
}

/**
 * function to update a single injuries
 * @param {Object} body
 * @param {String} id
 * @returns updated data
 */
async function updateInjuries(body: Injury, id: string) {
  try {
    return Injuries.updateOne({ _id: id }, body);
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

/**
 * function to delete a single injuries
 * @param {String} id
 * @returns object
 */
async function deleteInjuries(id: string) {
  try {
    return Injuries.deleteOne({ _id: id });
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

async function findInjuriesExist(id: string) {
  const exists = await Injuries.exists({ _id: id });

  if (!exists) return { error: true, message: 'Error: error getting the injuries' };

  return;
}

async function getAllInjuries() {
  return Injuries.aggregate([
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
  createInjuries,
  deleteInjuries,
  getInjuriesById,
  updateInjuries,
  findInjuriesExist,
  findInjuriesByEmail,
  getInjuriesByEmail,
  getAllInjuries,
  getInjuriesByBodyPart,
};

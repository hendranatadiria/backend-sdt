import { NextFunction, type Request, type Response } from 'express';
import { createUserSchema, deleteUserSchema, updateUserSchema } from '../schemas/user.schemas';
import { db } from '../config/db';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const data = await createUserSchema.validate(req.body);

  // insert data into database
  const result = await db.user.create({
    data: {
      emailAddress: data.emailAddress,
      firstName: data.firstName,
      lastName: data.lastName,
      location: data.location,
      birthday: data.birthday,
    }
  })

  return res.json(result);
} catch (err) {
  next(err);
}
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteUserSchema.validate(req.body);

    const result = await db.user.delete({
      where: {
        emailAddress: data.emailAddress
      }
    })

    return res.json(result);

  } catch (err) {
    next(err);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateUserSchema.validate(req.body);

    const result = await db.user.update({
      where: {
        emailAddress: data.emailAddress
      },
       data: {
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location,
        birthday: data.birthday,
       }
    })

    return res.json(result);

  } catch (err) {
    next(err);
  }
}
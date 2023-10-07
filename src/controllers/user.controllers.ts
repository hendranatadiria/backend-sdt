import { NextFunction, type Request, type Response } from 'express';
import { createUserSchema } from '../schemas/user.schemas';
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
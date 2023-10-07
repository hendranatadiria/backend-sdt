import { DateTime } from 'luxon';
import * as yup from 'yup'
import yupDateUtc from '../tools/yupDateUtc';
import { db } from '../config/db';

yup.addMethod(yup.string, 'ianaTz', function (this, message:string) {
  return this.test('ianaTz-test', message, function (value) {
    let msgError = message || 'Invalid time zone';
    const {path, createError} = this;
    const isValid = DateTime.local().setZone(value).isValid;
    return isValid || createError({path, message: msgError});
  })
})

yup.addMethod(yup.string, 'singleEmail', function (this, message:string) {
  return this.test('singleEmail-test', message, function (value) {
    const {path, createError} = this;
    let msgError = message || 'Email already exists';

    return db.user.findFirst({where: {emailAddress: value}}).then((user) => {
      return user == null || createError({path, message: msgError});
    })
  })
})

export const createUserSchema = yup.object().shape({
  emailAddress: yup.string().email("Invalid email format").singleEmail().required("Email is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  birthday: yup.date().transform(yupDateUtc).required("Birthday is required"),
  location: yup.string().ianaTz("Couldn't detect location. Please use the Continent/").required("Location is required")
});

export const updateUserSchema = yup.object().shape({
  emailAddress: yup.string().email("Invalid email format").required("Email is required"),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  birtday: yup.date().transform(yupDateUtc).optional(),
  location: yup.string().ianaTz().optional(),
});

export const deleteUserSchema = yup.object().shape({
  emailAddress: yup.string().email("Invalid email format").required("Email is required"),
});
import * as yup from 'yup';

export const sendEmailSchema = yup.object().shape({
  emailAddress: yup.string().email().required(),
  message: yup.string().required(),
});
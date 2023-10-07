import axios, { AxiosError } from "axios"
import { sendEmailSchema } from "../schemas/sendemail.schemas"
import { ValidationError } from "yup"
import SdtError from "../middlewares/SdtError"

export const sendEmail = async (emailAddress: string, message: string) => {
  try{
  // validate email address
  const data =  await sendEmailSchema.validate({emailAddress, message})
  
  // send email through DE's API
  const result = await axios.post(`${process.env.DE_API_URL}/send-email`, {
    email: data.emailAddress,
    message: data.message,
  })

  if (result.status !== 200) {
    throw new SdtError(result.status, result.data.message, result)
  }

  return result.data

  } catch (err) {
    console.error("⚠️ Error while sending email")
    console.error(err)
    // return SdtError so that it can be handled later
    if (err instanceof ValidationError) {
      throw new SdtError(400, 'Validation Error', err)
    } else if (err instanceof AxiosError) {
      throw new SdtError(500, 'Internal Server Error', err)
    } else {
      throw err
    }
  }
}
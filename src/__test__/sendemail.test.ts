import { describe, expect, test } from "@jest/globals";
import { sendEmail } from "../services/sendEmail";
import dotenv from "dotenv";
import SdtError from "../middlewares/SdtError";

dotenv.config();
const howMany = Array.from({length: 10}, (_, i) => i + 1);

describe('Testing sendemail service', () => {
  test.each(howMany)('should return status:sent or throw a SdtError', async (i) => {
    try {
      const result = await sendEmail('test@digitalenvision.com.au', `Test email ${i}`);
      expect(result.status).toEqual('sent');
    } catch (e) {
      expect(e).toBeInstanceOf(SdtError);
    }
  }, 60000)
})
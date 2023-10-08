import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { addEmailJob } from "../queues/sendEmail/producer";
import { EmailQueueType } from "../config/consts";

const howMany = Array.from({length: 10}, (_, i) => i + 1);

describe('Testing sendemail queue', () => {

  test.each(howMany)('Should be added into the queue successfully', async (i)  => {
    const job = await addEmailJob(`user${i}@gmail.com`, `Hey, user${i}@gmail.com. It's your birthday today, let's celebrate! 🎉`, EmailQueueType.BIRTHDAY)
    console.log(`Added job to queue for email #${i}`);
    expect(job).toBeTruthy();
  })

})
import { EmailQueueType } from "../config/consts";
import { findThisHourBday } from "../helpers/findThisHourBday";
import { addEmailJob } from "../queues/sendEmail/producer";

export const birthdayChecker = async () => {
  console.log('🎂 Checking for birthday people with 9AM on their TZ');
  const users = await findThisHourBday();
  if (users.length > 0) {
    users.forEach(async (user) => {
      try {
        addEmailJob(user.emailAddress, `Hey, ${user.firstName} ${user.lastName}! It's your birthday, let's celebrate! 🎉`, EmailQueueType.BIRTHDAY)
      } catch (err) {
        console.error(`⚠️ Error adding job to queue for ${user.emailAddress}`);
        console.error(err);
      }
    });
  }
  console.log(`🎂 Done checking and processing, found ${users.length} users`);
}
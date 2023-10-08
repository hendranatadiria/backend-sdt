import { Queue } from "bullmq";
import { EMAIL_QUEUE_NAME, redisAuthConn } from "../../config/redis";
import { EmailQueueType } from "../../config/consts";

export const queueEmail = new Queue(EMAIL_QUEUE_NAME, {
  connection: redisAuthConn,
});

export const addEmailJob = async (email: string, msg: string, type:EmailQueueType) => {
  return await queueEmail.add(EMAIL_QUEUE_NAME, 
  { email, msg, type},
  {
    attempts: 10,
    removeOnComplete: {
      age: 24 * 3600,
      count: 5000
    },
    removeOnFail: {
      age: 24 * 3600
    },
    jobId: `${type}_${email}` // to make sure that only one job per email per type is in the queue, per day.
  });
}
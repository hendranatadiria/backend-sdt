import { Job, Worker } from "bullmq";
import { EmailQueuePayload } from "../../types/EmailQueuePayload";
import { EMAIL_QUEUE_NAME, redisAuthConn } from "../../config/redis";
import { sendEmail } from "../../services/sendEmail";

async function sendEmailJobHandler(job: Job<EmailQueuePayload>) {
    console.log('====================');
    console.log('Calling sendEmail services...');
    const result = await sendEmail(job.data.email, job.data.msg);
    // if the process fails, it will throw an error, no need to handle it here.
    console.log('sendEmail services finished with result: '+result.status);
    console.log('====================');
    return result;
}

export default function startEmailWorker() {
const worker = new Worker<EmailQueuePayload, any>(EMAIL_QUEUE_NAME, async (job) => {
      console.log('🤖 Worker job: '+job.data.email)
      const res = await sendEmailJobHandler(job);
      job.updateProgress(100);
      return res;
  }, {
    connection: redisAuthConn,
    autorun: true,
  })

  worker.on('active', (job) => {
    console.log('🤖 Worker started working on sending email to '+job.data.email)
  })

  worker.on('completed', (job, returnValue) => {
    console.log('🤖 Worker finished working on sending email to '+job.data.email)
  })

  worker.on('failed', (job, err) => {
    console.log('🤖 Worker failed to send email to '+job?.data.email)
    console.log(err)
  })
}

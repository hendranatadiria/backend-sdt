import { ConnectionOptions } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

if (process.env.REDIS_AUTH_HOST === undefined) {
  throw new Error('REDIS_AUTH_HOST must be defined!');
}
if (process.env.REDIS_AUTH_PORT === undefined) {
  throw new Error('REDIS_AUTH_PORT must be defined!');
}
if (process.env.REDIS_AUTH_USERNAME === undefined) {
  throw new Error('REDIS_AUTH_USERNAME must be defined!');
}
if (process.env.REDIS_AUTH_PASSWORD === undefined) {
  throw new Error('REDIS_AUTH_PASSWORD must be defined!');
}

export const redisAuthConn:ConnectionOptions = {
  host: process.env.REDIS_AUTH_HOST,
  port: process.env.REDIS_AUTH_PORT ? parseInt(process.env.REDIS_AUTH_PORT) : undefined,
  username: process.env.REDIS_AUTH_USERNAME,
  password: process.env.REDIS_AUTH_PASSWORD,
  tls: {
    rejectUnauthorized: false
  }
};

export const EMAIL_QUEUE_NAME = 'emailQueue';
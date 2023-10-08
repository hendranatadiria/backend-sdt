export type EmailQueuePayload = {
  email: string;
  msg: string;
  type: EmailQueueType;
}
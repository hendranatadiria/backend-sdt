// init and execute all worker in this separate process

import startEmailWorker from "./queues/sendEmail/consumer";

startEmailWorker();
// future scalability:
//add other worker here (media converter, etc)
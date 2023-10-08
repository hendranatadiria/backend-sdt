// init and execute all worker in this separate process

import startEmailWorker from "./queues/sendEmail/consumer";

startEmailWorker();
// future scalability:
//add other worker here (media converter, etc)

// Don't put anything after this line
console.log('🤖 All worker standby, ready to work!')
import express from 'express'
import router from './routes'
import cors from 'cors'
import errorHandler from './middlewares/error-handler'
import SdtJson from './middlewares/SdtJson'
import cron from 'node-cron'
import { birthdayChecker } from './controllers/cronjob.controller'

const port = process.env.PORT || 3000
const api = express()

api.use(express.json())
api.use(cors())
api.use(SdtJson);
api.use("/",router)
api.use(errorHandler)

const srv = api.listen(port, () => {
  console.log("Backend Assessment SDT")
  console.log("Written by: Bernardinus Hendra Natadiria")
  console.log(`API listening on port ${port}`)
  
})

cron.schedule('0 * * * *', birthdayChecker)

export default srv;
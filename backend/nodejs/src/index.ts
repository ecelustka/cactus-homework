import * as express from 'express'
import * as cors from 'cors'
import { variables } from './config'
import { getCactuses } from './helpers/get-cactuses'
import { modifyCactus } from './helpers/modify-cactus'
import { deleteCactus } from './helpers/delete-cactus'
import { createCactus } from './helpers/create-cactus'

const app: express.Application = express()
app.use(cors())
app.use(express.json())

const CACTUS_PATH = variables.BACKEND_PATH || '/cactus'
const BACKEND_PORT = variables.BACKEND_PORT || 8080

app.get(CACTUS_PATH, getCactuses)
app.put(CACTUS_PATH, modifyCactus)
app.delete(CACTUS_PATH, deleteCactus)
app.post(CACTUS_PATH, createCactus)

app.listen(BACKEND_PORT, () => {
    console.log(`App is listening on port ${BACKEND_PORT}`)
})

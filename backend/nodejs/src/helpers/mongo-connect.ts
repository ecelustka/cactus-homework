import { MongoClient } from 'mongodb'
import { variables } from '../config'

export default (): MongoClient => {
    const uri = variables.DB_CONNECTION_STRING

    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
    })

    return client
}

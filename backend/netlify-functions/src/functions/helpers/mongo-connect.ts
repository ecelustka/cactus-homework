import { MongoClient } from 'mongodb'

export default (): MongoClient => {
    const uri = process.env.DB_CONNECTION_STRING

    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
    })

    return client
}

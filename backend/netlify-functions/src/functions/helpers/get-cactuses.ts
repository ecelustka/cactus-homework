import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import type { MongoClient } from 'mongodb'
import type { CactusItem, DbResponse } from '../../types'
import dbConnection from './mongo-connect'

// Get data from db
const getData = async (id: string): Promise<DbResponse> => {
    const client: MongoClient = dbConnection()

    const where: { id?: string } = {}

    if (id) {
        where.id = id
    }

    try {
        await client.connect()

        const data: Array<CactusItem> = await client
            .db('db')
            .collection('cactuses')
            .find(where)
            .toArray()

        return {
            err: false,
            data,
        }
    } catch (err) {
        console.log(err)

        return {
            err: true,
            message: "We are sorry, there's problem on the server.",
        }
    } finally {
        await client.close()
    }
}

// GET /cactus
// GET /cactus?id=1
export const getCactuses = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    // Load data from db
    const response: DResponse = await getData(event.queryStringParameters.id)

    if (response.err) {
        return {
            statusCode: 500,
            body: JSON.stringify(response),
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response.data),
    }
}

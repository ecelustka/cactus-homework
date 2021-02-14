import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import type { MongoClient } from 'mongodb'
import type { CactusItem, DbResponse } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import dbConnection from './mongo-connect'
import parseJson from './parse-json'
import { bodyOk } from './body-ok'

// Insert item into db
const insertData = async (data: CactusItem): Promise<DbResponse> => {
    const client: MongoClient = dbConnection()

    try {
        await client.connect()

        const { ops } = await client
            .db('db')
            .collection('cactuses')
            .insertOne({
                id: uuidv4(),
                ...data,
            })

        return { err: false, data: ops[0] }
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

// POST /cactus
export const createCactus = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
        return {
            statusCode: 204,
            body: JSON.stringify({
                error: true,
                message: 'The request is empty.',
            }),
        }
    }

    const parsedBody: CactusItem | undefined = parseJson(event.body)

    const bodyError = bodyOk(parsedBody, false)
    if (bodyError) {
        return bodyError
    }

    const response: DbResponse = await insertData(parsedBody)
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

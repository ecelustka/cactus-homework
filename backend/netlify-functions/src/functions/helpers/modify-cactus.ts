import type { MongoClient } from 'mongodb'
import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import type { CactusItem, DbResponse } from '../../types'
import { bodyOk } from './body-ok'
import dbConnection from './mongo-connect'
import parseJson from './parse-json'

// Update item in db
const updateData = async (data: CactusItem): Promise<DbResponse> => {
    const client: MongoClient = dbConnection()

    try {
        await client.connect()

        delete data['_id']

        const { ops } = await client
            .db('db')
            .collection('cactuses')
            .replaceOne({ id: data.id }, data)

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

// PUT /cactus
export const modifyCactus = async (
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
    if (!parsedBody) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: "Data doesn't have the right format.",
            }),
        }
    }

    const bodyError = bodyOk(parsedBody)
    if (bodyError) {
        return bodyError
    }

    const response: DbResponse = await updateData(parsedBody)
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

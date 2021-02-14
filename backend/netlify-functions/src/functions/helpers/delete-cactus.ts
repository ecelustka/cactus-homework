import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import type { MongoClient } from 'mongodb'
import type { CactusId, DbResponse } from '../../types'
import dbConnection from './mongo-connect'
import parseJson from './parse-json'

// Delete item from db
const deleteData = async (id: CactusId): Promise<DbResponse> => {
    const client: MongoClient = dbConnection()

    try {
        await client.connect()

        await client.db('db').collection('cactuses').deleteOne(id)

        return { err: false, data: id }
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

// DELETE /cactus
export const deleteCactus = async (
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

    const parsedBody: CactusId | undefined = parseJson(event.body)
    if (!parsedBody) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: "Data doesn't have the right format.",
            }),
        }
    }

    if (!parsedBody.id) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: "Data doesn't include the id key.",
            }),
        }
    }

    const response: DbResponse = await deleteData(parsedBody)
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

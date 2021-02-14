import type { APIGatewayEvent, Handler } from 'aws-lambda'
import { getCactuses } from './helpers/get-cactuses'
import { createCactus } from './helpers/create-cactus'
import { modifyCactus } from './helpers/modify-cactus'
import { deleteCactus } from './helpers/delete-cactus'

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, GET, POST, PUT',
}

export const handler: Handler = async (event: APIGatewayEvent) => {
    switch (event.httpMethod) {
        case 'OPTIONS':
            return {
                statusCode: 200,
                headers,
            }
        case 'GET':
            return {
                headers,
                ...(await getCactuses(event)),
            }
        case 'POST':
            return {
                headers,
                ...(await createCactus(event)),
            }
        case 'PUT':
            return {
                headers,
                ...(await modifyCactus(event)),
            }
        case 'DELETE':
            return {
                headers,
                ...(await deleteCactus(event)),
            }
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({
                    err: true,
                    message: 'The method is not allowed.',
                }),
            }
    }
}

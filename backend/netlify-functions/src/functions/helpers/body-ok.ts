import { APIGatewayProxyResult } from 'aws-lambda'
import { CactusItem } from '../../types'

export const bodyOk = (
    parsedBody: CactusItem,
    useId = true
): APIGatewayProxyResult | void => {
    if (useId && !parsedBody.id) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: "Data doesn't include the id key.",
            }),
        }
    }

    if (!parsedBody.name) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: "Data doesn't include the name key.",
            }),
        }
    }

    if (!parsedBody.latinName) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: "Data doesn't include the latinName key.",
            }),
        }
    }

    if (!parsedBody.flowerpotSize) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: "Data doesn't include the flowerpotSize key.",
            }),
        }
    }

    if (!parsedBody.thornsNumber) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: "Data doesn't include the thornsNumber key.",
            }),
        }
    }
}

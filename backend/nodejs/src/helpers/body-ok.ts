import type { CactusItem, ErrorBody } from '../types'

export const bodyOk = (
    parsedBody: CactusItem,
    useId = true
): ErrorBody | void => {
    if (useId && !parsedBody.id) {
        return {
            error: true,
            message: "Data doesn't include the id key.",
        }
    }

    if (!parsedBody.name) {
        return {
            error: true,
            message: "Data doesn't include the name key.",
        }
    }

    if (!parsedBody.latinName) {
        return {
            error: true,
            message: "Data doesn't include the latinName key.",
        }
    }

    if (!parsedBody.flowerpotSize) {
        return {
            error: true,
            message: "Data doesn't include the flowerpotSize key.",
        }
    }

    if (!parsedBody.thornsNumber) {
        return {
            error: true,
            message: "Data doesn't include the thornsNumber key.",
        }
    }
}

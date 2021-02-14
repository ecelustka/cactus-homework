import type { MongoClient } from 'mongodb'
import type { Request, Response } from 'express'
import type { CactusItem, DbResponse } from '../types'
import { bodyOk } from './body-ok'
import dbConnection from './mongo-connect'

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
    req: Request,
    res: Response
): Promise<void> => {
    if (!req.body) {
        res.status(204).json({
            error: true,
            message: 'The request is empty.',
        })
        return
    }

    const bodyError = bodyOk(req.body)
    if (bodyError) {
        res.status(400).json(bodyError)
        return
    }

    const response: DbResponse = await updateData(req.body)
    if (response.err) {
        res.status(500).json(response)
        return
    }

    res.status(200).json(response.data)
}

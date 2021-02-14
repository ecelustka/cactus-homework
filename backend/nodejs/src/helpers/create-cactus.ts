import type { Request, Response } from 'express'
import type { MongoClient } from 'mongodb'
import type { CactusItem, DbResponse } from '../types'
import { v4 as uuidv4 } from 'uuid'
import dbConnection from './mongo-connect'
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

    const bodyError = bodyOk(req.body, false)
    if (bodyError) {
        res.status(400).json(bodyError)
        return
    }

    const response: DbResponse = await insertData(req.body)
    if (response.err) {
        res.status(500).json(response)
        return
    }

    res.status(200).json(response.data)
}

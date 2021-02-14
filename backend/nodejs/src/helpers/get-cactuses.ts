import type { MongoClient } from 'mongodb'
import type { Request, Response } from 'express'
import type { CactusItem, DbResponse } from '../types'
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
    req: Request,
    res: Response
): Promise<void> => {
    // Load data from db

    const response: DbResponse = await getData(req.query.id as string)
    if (response.err) {
        res.status(500).json(response)
        return
    }

    res.status(200).json(response.data)
}

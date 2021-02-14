import type { Request, Response } from 'express'
import type { MongoClient } from 'mongodb'
import type { CactusId, DbResponse } from '../types'
import dbConnection from './mongo-connect'

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

    if (!req.body.id) {
        res.status(400).json({
            error: true,
            message: "Data doesn't include the id key.",
        })
        return
    }

    const response: DbResponse = await deleteData(req.body)
    if (response.err) {
        res.status(500).json(response)
        return
    }

    res.status(200).json(response.data)
}

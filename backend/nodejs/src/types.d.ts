export interface CactusId {
    id?: string
}

export interface CactusItem extends CactusId {
    name: string
    latinName: string
    flowerpotSize: string
    thornsNumber: number
}

export interface DbResponse {
    err: boolean
    data?: Array<CactusItem> | CactusId
    message?: string
}

export interface ErrorBody {
    error: boolean
    message: string
}

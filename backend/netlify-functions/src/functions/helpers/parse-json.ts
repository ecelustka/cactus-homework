import type { CactusItem } from '../../types'

export default (data: string): CactusItem | undefined => {
    try {
        return JSON.parse(data)
    } catch (error) {
        return
    }
}

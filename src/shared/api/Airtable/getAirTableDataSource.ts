import { Record } from '../../../entities'
import { Sort } from '../../../entities'

export interface GetAirTablePayload {
  baseId: string
  tableId: string
  sort: Sort[]
}
export interface GetAirTableResponse {
  id: string
  records: Record[]
}

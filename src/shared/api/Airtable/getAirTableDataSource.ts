import { Record } from '../../../entities'

export interface GetAirTablePayload {
  baseId: string
  tableId: string
}
export interface GetAirTableResponse {
  id: string
  records: Record[]
}

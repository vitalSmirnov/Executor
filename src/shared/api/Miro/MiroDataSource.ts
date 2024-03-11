import { Card, Image, PositionDTO, Sticky } from '../../../entities'

export interface CreateCardPayload extends PositionDTO {
  boardId: string
  data: Card
}
export interface CreateCardResponse extends PositionDTO {
  id: string
}

export interface CreateImagePayload extends PositionDTO {
  boardId: string
  data: Image
}
export interface CreateImageResponse extends PositionDTO {
  id: string
}

export interface CreateStickyPayload extends PositionDTO {
  boardId: string
  data: Sticky
}
export interface CreateStickyResponse extends PositionDTO {
  id: string
}

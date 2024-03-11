export interface PositionDTO {
  position?: {
    x: number
    y: number
  }
  geometry?: {
    width?: number
    height?: number
    origin?: string
    relativeTo?: string
  }
}

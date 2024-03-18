import { Rect } from '@mirohq/websdk-types'

export const getCenterViewport = (viewport: Rect) => {
  return {
    x: viewport.x + viewport.width / 2,
    y: viewport.y + viewport.height / 2,
  }
}

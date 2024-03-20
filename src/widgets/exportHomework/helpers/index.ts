import { Rect } from '@mirohq/websdk-types'
import { Record, Work } from '../../../entities'

export const getCenterViewport = (viewport: Rect) => {
  return {
    x: viewport.x + viewport.width / 2,
    y: viewport.y + viewport.height / 2,
  }
}

const createSticky = async (centeredViewport: { x: number; y: number }, part: number, item: Record) => {
  const sticky = await miro.board.createStickyNote({
    content: item.fields.Notes.slice(part * 2000, (part + 1) * 2000 - 1),
    x: centeredViewport.x - 400,
    y: centeredViewport.y + part,
  })
  await sticky.sync()
}

export const insertStickyNotes = async (item: Record, centeredViewport: { x: number; y: number }) => {
  const valueOfStickies = item.fields.Notes.length / 1999

  if (valueOfStickies > 1) {
    for (let part = 0; part < valueOfStickies; part += 1) {
      await createSticky(centeredViewport, part * 180, item)
    }
  } else {
    await createSticky(centeredViewport, 0, item)
  }
}

const createImage = async (
  sizeValue: number,
  image: Work,
  centeredViewport: { x: number; y: number },
  number: number
) => {
  const imageResponse = await miro.board.createImage({
    url: image.url,
    height: sizeValue,
    y: centeredViewport.y + (number + 1) * sizeValue,
    x: centeredViewport.x,
  })
  await imageResponse.sync()
}

export const insertImage = async (item: Record, centeredViewport: { x: number; y: number }, sizeValue: number) => {
  item.fields.Attachments.map(async (image, number) => {
    createImage(sizeValue, image, centeredViewport, number)
  })
}

export const insertCard = async (item: Record, centeredViewport: { x: number; y: number }) => {
  const card = await miro.board.createCard({
    title: item.fields.Name,
    description: item.fields.Notes ? item.fields.Notes : 'empty',
    x: centeredViewport.x,
    y: centeredViewport.y,
  })
  await card.sync()
}

import { Rect } from '@mirohq/websdk-types'
import { Record, Work } from '../../../entities'
import { GetAirTableResponse } from '../../../shared'

export const getCenterViewport = (viewport: Rect) => {
  return {
    x: viewport.x + viewport.width / 2,
    y: viewport.y + viewport.height / 2,
  }
}

const createSticky = async (centeredViewport: { x: number; y: number }, part: number, item: Record) => {
  const sticky = await miro.board.createStickyNote({
    content: item.fields.Notes.slice(part * 2000, (part + 1) * 2000 - 1),
    x: centeredViewport.x - 300,
    y: centeredViewport.y + part,
  })
  await sticky.sync()
}

const insertStickyNotes = async (item: Record, centeredViewport: { x: number; y: number }) => {
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
  const imageItem = await miro.board.createImage({
    url: image.url,
    height: Number(sizeValue),
    y: centeredViewport.y + number * Number(sizeValue),
    x: centeredViewport.x + 40,
  })
  await imageItem.sync()
}

const insertImages = async (item: Record, centeredViewport: { x: number; y: number }, sizeValue: number) => {
  item.fields.Attachments.map(async (image, number) => {
    await createImage(Number(sizeValue), image, centeredViewport, number)
  })
}

const insertCard = async (item: Record, centeredViewport: { x: number; y: number }) => {
  const card = await miro.board.createCard({
    title: item.fields.Name,
    description: item.fields.Notes ? item.fields.Notes : 'empty',
    x: centeredViewport.x,
    y: centeredViewport.y,
  })
  await card.sync()
}

export const importHomework = async (data: GetAirTableResponse, sizeValue: number) => {
  const viewport = await miro.board.viewport.get()
  data!.records.map(async (item, number) => {
    const centeredViewport = getCenterViewport(viewport)
    centeredViewport.x += sizeValue * 2.5 * number

    await insertCard(item, centeredViewport)

    if (item.fields.Notes) {
      await insertStickyNotes(item, centeredViewport)
    }

    if (item.fields.Attachments) {
      centeredViewport.y += sizeValue * 0.7
      await insertImages(item, centeredViewport, sizeValue)
    }
  })
}

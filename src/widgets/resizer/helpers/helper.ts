import { Image } from '@mirohq/websdk-types'

const resizeImages = async (item: Image, selectedSize: number, centeredViewport: { x: number; y: number }) => {
  item.height = selectedSize
  await item.sync()
  centeredViewport.x += item.width / 2
  item.x = centeredViewport.x
  item.y = centeredViewport.y
  centeredViewport.x += item.width / 2 + selectedSize / 10
  await item.sync()
}

const getViewPort = async () => {
  const viewport = await miro.board.viewport.get()
  return {
    x: viewport.x + viewport.width / 2,
    y: viewport.y + viewport.height / 2,
  }
}

const getImagesSelection = async () => {
  const selection = await miro.board.getSelection()
  return selection.filter(item => item.type === 'image') as Image[]
}

export const resizeHandler = async (selectedSize: number) => {
  const selectedImages = await getImagesSelection()
  const centeredViewport = await getViewPort()

  selectedImages.map(async item => {
    await resizeImages(item, selectedSize, centeredViewport)
  })

  await miro.board.group({ items: selectedImages })
}

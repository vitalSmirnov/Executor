import { RecordList } from '../../components'
import { Button, TopicHeader, Input, useGetHomeworkQuery } from '../../shared'
import { useState } from 'react'
import { getCenterViewport } from './helpers'

interface HomeWorkDownloadButtonProps {
  errorCallback: () => void
}

export const HomeWorkDownloadButton = ({ errorCallback }: HomeWorkDownloadButtonProps) => {
  const tableId = localStorage.getItem('airtableName')
  const airtableBaseId = localStorage.getItem('airtableId')

  const [sizeValue, setSizeValue] = useState<number>(300)

  const { data, isError, isFetching } = useGetHomeworkQuery({
    tableId: tableId!,
    baseId: airtableBaseId!,
  })

  if (isError) {
    errorCallback()
  }

  const insertImages = async () => {
    const viewport = await miro.board.viewport.get()

    data!.records.map(async (item, number) => {
      const centeredViewport = getCenterViewport(viewport)
      centeredViewport.x += sizeValue * 3 * number

      const card = await miro.board.createCard({
        title: item.fields.Name,
        description: item.fields.Notes,
        x: centeredViewport.x,
        y: centeredViewport.y,
      })
      await card.sync()

      const valueOfStickies = item.fields.Notes.length / 1999

      if (valueOfStickies > 1) {
        for (let part = 0; part < valueOfStickies; part += 1) {
          const sticky = await miro.board.createStickyNote({
            content: item.fields.Notes.slice(part * 2000, (part + 1) * 2000 - 1),
            x: centeredViewport.x - 400,
            y: centeredViewport.y + part * 180,
          })

          await sticky.sync()
        }
      } else {
        const sticky = await miro.board.createStickyNote({
          content: item.fields.Notes,
          x: centeredViewport.x - 400,
          y: centeredViewport.y,
        })
        await sticky.sync()
      }

      if (item.fields.Attachments) {
        item.fields.Attachments.map(async (image, number) => {
          const imageResponse = await miro.board.createImage({
            url: image.url,
            height: sizeValue,
            y: centeredViewport.y + (number + 1) * sizeValue,
            x: centeredViewport.x,
          })
          await imageResponse.sync()
        })
      }
    })
  }

  return (
    <>
      <TopicHeader children={'Students homework'} />
      {!isFetching && !isError && <RecordList data={data!} />}
      <Input<number>
        value={sizeValue}
        label={'Height'}
        onChange={e => setSizeValue(e)}
      />
      <Button
        disabled={isError}
        onClick={insertImages}
        title={'Export homework'}
      />
    </>
  )
}

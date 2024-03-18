import {
  useCreateCardMutation,
  useCreateImageMutation,
  useCreateStickyNoteMutation,
  useGetHomeworkQuery,
} from '../../shared/api'
import { RecordList } from '../../components/RecordList/RecordList'
import { Button } from '../../shared/ui/button'
import { Input } from '../../shared/ui/Input'
import { useState } from 'react'
import { TopicHeader } from '../../shared/ui/TopicHeader'
import { getCenterViewport } from './helpers'

export const HomeWorkDownloadButton = () => {
  const tableId = localStorage.getItem('airtableName')
  const airtableBaseId = localStorage.getItem('airtableId')
  const miroId = localStorage.getItem('miroId')
  const [createCard] = useCreateCardMutation()
  const [createStickyNote] = useCreateStickyNoteMutation()
  const [createImage] = useCreateImageMutation()

  const [sizeValue, setSizeValue] = useState<number>(300)

  const { data, isError } = useGetHomeworkQuery({
    tableId: tableId!,
    baseId: airtableBaseId!,
    sort: [
      {
        field: 'createdTime',
        direction: 'desc',
      },
    ],
  })

  const insertImages = async () => {
    const viewport = await miro.board.viewport.get()

    data!.records.map(async (item, number) => {
      const centeredViewport = getCenterViewport(viewport)
      centeredViewport.x += sizeValue * 3 * number

      await createCard({
        boardId: miroId!,
        data: {
          title: item.fields.Name,
          description: item.fields.Notes,
        },
        position: centeredViewport,
      })

      const valueOfStickies = item.fields.Notes.length / 1999

      if (valueOfStickies > 1) {
        for (let part = 0; part < valueOfStickies; part += 1) {
          await createStickyNote({
            boardId: miroId!,
            data: {
              content: item.fields.Notes.slice(part * 2000, (part + 1) * 2000 - 1),
            },
            position: { x: centeredViewport.x - 400, y: centeredViewport.y + part * 180 },
          })
        }
      } else {
        await createStickyNote({
          boardId: miroId!,
          data: {
            content: item.fields.Notes,
          },
          position: { x: centeredViewport.x - 400, y: centeredViewport.y },
        })
      }

      if (item.fields.Attachments) {
        item.fields.Attachments.map(async (image, number) => {
          await createImage({
            boardId: miroId!,
            data: {
              url: image.url,
            },
            geometry: { height: sizeValue },
            position: {
              y: centeredViewport.y + (number + 1) * sizeValue,
              x: centeredViewport.x,
            },
          })
        })
      }
    })
  }

  return (
    <>
      <TopicHeader children={'Students homework'} />
      <RecordList data={data!} />
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

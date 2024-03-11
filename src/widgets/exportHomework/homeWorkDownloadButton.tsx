import { Rect } from '@mirohq/websdk-types'
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

const getCenterViewport = (viewport: Rect) => {
  return {
    x: viewport.x + viewport.width / 2,
    y: viewport.y + viewport.height / 2,
  }
}

export const HomeWorkDownloadButton = () => {
  const tableId = localStorage.getItem('airtableName')
  const airtableBaseId = localStorage.getItem('airtableId')
  const miroId = localStorage.getItem('miroId')
  const { data, isError } = useGetHomeworkQuery({ tableId: tableId!, baseId: airtableBaseId! })
  const [createCard] = useCreateCardMutation()
  const [createStickyNote] = useCreateStickyNoteMutation()
  const [createImage] = useCreateImageMutation()

  const [sizeValue, setSizeValue] = useState<number>(300)

  const sizeValueHandler = (value: number) => {
    setSizeValue(value)
  }

  const insertImages = async () => {
    const viewport = await miro.board.viewport.get()

    data!.records.map(async (item, number) => {
      const centeredViewport = getCenterViewport(viewport)
      centeredViewport.x += sizeValue * 2 * number

      await createCard({
        boardId: miroId!,
        data: {
          title: item.fields.Name,
          description: item.fields.Comment,
        },
        position: centeredViewport,
      })
      await createStickyNote({
        boardId: miroId!,
        data: {
          content: item.fields.Comment,
        },
        position: { x: centeredViewport.x - 300, y: centeredViewport.y },
      })

      item.fields.Work.map(async (image, number) => {
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
    })
  }

  return (
    <>
      <TopicHeader children={'Students homework'} />
      <RecordList data={data!} />
      <Input<number>
        value={sizeValue}
        label={'Height'}
        onChange={sizeValueHandler}
      />
      <Button
        disabled={isError}
        onClick={insertImages}
        title={'Export homework'}
      />
    </>
  )
}

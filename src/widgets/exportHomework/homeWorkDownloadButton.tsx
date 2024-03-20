import { RecordList } from '../../components'
import { Button, TopicHeader, Input, useGetHomeworkQuery } from '../../shared'
import { useState } from 'react'
import { getCenterViewport, insertCard, insertImage, insertStickyNotes } from './helpers'

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

      await insertCard(item, centeredViewport)

      if (item.fields.Notes) {
        await insertStickyNotes(item, centeredViewport)
      }

      if (item.fields.Attachments) {
        await insertImage(item, centeredViewport, sizeValue)
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

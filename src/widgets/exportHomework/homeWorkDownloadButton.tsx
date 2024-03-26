import { RecordList } from '../../components'
import { Button, TopicHeader, Input, useGetHomeworkQuery } from '../../shared'
import { useState } from 'react'
import { getCenterViewport, insertCard, insertImages, insertStickyNotes } from './helpers'

interface HomeWorkDownloadButtonProps {
  errorCallback: () => void
}

export const HomeWorkDownloadButton = ({ errorCallback }: HomeWorkDownloadButtonProps) => {
  const tableId = localStorage.getItem('airtableName')
  const airtableBaseId = localStorage.getItem('airtableId')

  const [sizeValue, setSizeValue] = useState<number>(300)

  const setSize = (value: number) => {
    setSizeValue(value)
  }

  const { data, isError, isFetching } = useGetHomeworkQuery({
    tableId: tableId!,
    baseId: airtableBaseId!,
  })

  if (isError) {
    errorCallback()
  }

  const exportImages = async () => {
    const viewport = await miro.board.viewport.get()

    data!.records.map(async (item, number) => {
      const centeredViewport = getCenterViewport(viewport)
      centeredViewport.x += sizeValue * 3 * number

      await insertCard(item, centeredViewport)

      if (item.fields.Notes) {
        await insertStickyNotes(item, centeredViewport)
      }

      if (item.fields.Attachments) {
        await insertImages(item, centeredViewport, sizeValue)
      }
    })
  }

  return (
    <>
      <TopicHeader children={'Students homework'} />
      <Input<number>
        value={sizeValue}
        label={'Height'}
        onChange={setSize}
      />
      <Button
        disabled={isError}
        onClick={exportImages}
        title={'Export homework'}
      />
      {!isFetching && !isError && <RecordList data={data!} />}
    </>
  )
}

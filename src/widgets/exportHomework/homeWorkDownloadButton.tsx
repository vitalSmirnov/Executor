import { RecordList } from '../../components'
import { Button, TopicHeader, Input, useGetHomeworkQuery } from '../../shared'
import { useState } from 'react'
import { importHomework } from './helpers'

interface HomeWorkDownloadButtonProps {
  errorCallback: () => void
}

export const HomeWorkDownloadButton = ({ errorCallback }: HomeWorkDownloadButtonProps) => {
  const tableId = localStorage.getItem('airtableName')
  const airtableBaseId = localStorage.getItem('airtableId')

  const [sizeValue, setSizeValue] = useState<number>(1000)

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
    await importHomework(data!, sizeValue)
  }

  return (
    <>
      <TopicHeader children={'Students homework'} />
      <Input<number>
        step={100}
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

import { useEffect, useState } from 'react'
import { TopicHeader } from '../../shared'
import { Input } from '../../shared'
import { Button } from '../../shared'
import { setEnvVariables } from './helpers'

interface AuthProps {
  errorCallback: () => void
}
export const Auth = ({ errorCallback }: AuthProps) => {
  const [airtableApiKey, setApiKey] = useState(localStorage.getItem('airtableApi'))
  const [airtableBoardName, setBoardName] = useState(localStorage.getItem('airtableName'))
  const [airtableBaseId, setBaseId] = useState(localStorage.getItem('airtableId'))
  const [miroId, setMiroId] = useState(localStorage.getItem('miroId'))
  const [danger, setDanger] = useState(false)

  useEffect(() => {
    if (miroId && airtableBaseId && airtableBoardName && airtableApiKey) {
      setDanger(false)
    } else {
      setDanger(true)
    }
  }, [miroId, airtableBaseId, airtableBoardName, airtableApiKey])

  return (
    <>
      <TopicHeader children={'Settings'} />
      {danger && (
        <TopicHeader
          className={'danger'}
          level={5}
          children={'Please fill up all fields'}
        />
      )}
      <form>
        <Input<string>
          label={'Airtable API key'}
          value={airtableApiKey!}
          onChange={setApiKey}
        />
        <Input<string>
          label={'Airtable base ID'}
          value={airtableBaseId!}
          onChange={setBaseId}
        />
        <Input<string>
          label={'Airtable board name'}
          value={airtableBoardName!}
          onChange={setBoardName}
        />
        <Input<string>
          label={'Miro board ID'}
          value={miroId!}
          onChange={setMiroId}
        />
        <Button
          onClick={() =>
            setEnvVariables({
              miroId: miroId!,
              airtableBaseId: airtableBaseId!,
              airtableBoardName: airtableBoardName!,
              airtableApiKey: airtableApiKey!,
              errorCallback,
            })
          }
          title={'Set env variables'}
        />
      </form>
    </>
  )
}

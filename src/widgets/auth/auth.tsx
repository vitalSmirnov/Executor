import { useEffect, useState } from 'react'
import { TopicHeader } from '../../shared/ui/TopicHeader'
import { Input } from '../../shared/ui/Input'
import { Button } from '../../shared/ui/button'
import { setEnvVariables } from './helpers'

export const Auth = () => {
  const [airtableApiKey, setApiKey] = useState(localStorage.getItem('airtableApi'))
  const [airtableBoardName, setBoardName] = useState(localStorage.getItem('airtableName'))
  const [airtableBaseId, setBaseId] = useState(localStorage.getItem('airtableId'))
  const [danger, setDanger] = useState(false)

  useEffect(() => {
    if (airtableBaseId && airtableBoardName && airtableApiKey) {
      setDanger(false)
    } else {
      setDanger(true)
    }
  }, [airtableBaseId, airtableBoardName, airtableApiKey])

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
        <Button
          onClick={() =>
            setEnvVariables({
              airtableBaseId: airtableBaseId!,
              airtableBoardName: airtableBoardName!,
              airtableApiKey: airtableApiKey!,
            })
          }
          title={'Set env variables'}
        />
      </form>
    </>
  )
}

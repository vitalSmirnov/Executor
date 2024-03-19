interface SetVariablesProps {
  miroId?: string
  airtableBaseId?: string
  airtableBoardName?: string
  airtableApiKey?: string
  errorCallback: () => void
}

export const setEnvVariables = ({
  miroId,
  airtableApiKey,
  airtableBaseId,
  airtableBoardName,
  errorCallback,
}: SetVariablesProps) => {
  localStorage.setItem('miroId', miroId!)
  localStorage.setItem('airtableId', airtableBaseId!)
  localStorage.setItem('airtableName', airtableBoardName!)
  localStorage.setItem('airtableApi', airtableApiKey!)
  errorCallback()
}

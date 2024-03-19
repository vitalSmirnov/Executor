interface SetVariablesProps {
  airtableApiKey?: string
  airtableBaseId?: string
  airtableBoardName?: string
  errorCallback: () => void
}

export const setEnvVariables = ({
  airtableApiKey,
  airtableBaseId,
  airtableBoardName,
  errorCallback,
}: SetVariablesProps) => {
  localStorage.setItem('airtableId', airtableBaseId!)
  localStorage.setItem('airtableName', airtableBoardName!)
  localStorage.setItem('airtableApi', airtableApiKey!)
  errorCallback()
}

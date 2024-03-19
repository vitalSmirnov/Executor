interface SetVariablesProps {
  airtableBaseId?: string
  airtableBoardName?: string
  airtableApiKey?: string
}

export const setEnvVariables = ({ airtableApiKey, airtableBaseId, airtableBoardName }: SetVariablesProps) => {
  localStorage.setItem('airtableId', airtableBaseId!)
  localStorage.setItem('airtableName', airtableBoardName!)
  localStorage.setItem('airtableApi', airtableApiKey!)
}

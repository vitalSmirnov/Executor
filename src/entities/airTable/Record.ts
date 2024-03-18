export interface Record {
  id: string
  createdTime: string
  fields: Field
}

export interface Field {
  Notes: string
  Name: string
  Date: string
  Attachments: Work[]
}

export interface Work {
  id: string
  width: number
  height: number
  url: string
  filename: string
  size: number
  type: string
}

export interface Record {
  id: string
  createdTime: string
  fields: Field
}

export interface Field {
  Comment: string
  Name: string
  Date: string
  Work: Work[]
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

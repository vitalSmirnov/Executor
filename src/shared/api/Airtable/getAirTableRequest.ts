import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetAirTablePayload, GetAirTableResponse } from './getAirTableDataSource'

export const airtableApi = createApi({
  reducerPath: 'airtableApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.airtable.com/v0/',
    prepareHeaders: headers => {
      const token = localStorage.getItem('airtableApi')

      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token!}`)
      }
      headers.set('Content-Type', 'application/json')

      return headers
    },
  }),
  endpoints: builder => ({
    getHomework: builder.query<GetAirTableResponse, GetAirTablePayload>({
      query: payload => `${payload.baseId}/${payload.tableId}?sort[0][direction]=asc&sort[0][field]=Date`,
    }),
  }),
})
export const { useGetHomeworkQuery } = airtableApi

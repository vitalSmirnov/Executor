import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRoutes } from '../../ApiRoutes/apiRoutes'
import {
  CreateCardPayload,
  CreateCardResponse,
  CreateImagePayload,
  CreateImageResponse,
  CreateStickyPayload,
  CreateStickyResponse,
} from './MiroDataSource'

export const miroApi = createApi({
  reducerPath: 'miroApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.miro.com/v2/boards/',
    prepareHeaders(headers) {
      const token = 'eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_P-aXMiVk_w4erGuKtZNNV0MgqbI'
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')

      return headers
    },
  }),
  endpoints: builder => ({
    createCard: builder.mutation<CreateCardResponse, CreateCardPayload>({
      query: ({ boardId, ...body }) => ({
        url: `${boardId}${ApiRoutes.CREATE_CARD}`,
        method: 'POST',
        body: body,
      }),
    }),
    createImage: builder.mutation<CreateImageResponse, CreateImagePayload>({
      query: ({ boardId, ...body }) => ({
        url: `${boardId}${ApiRoutes.IMAGE}`,
        method: 'POST',
        body: body,
      }),
    }),
    createStickyNote: builder.mutation<CreateStickyResponse, CreateStickyPayload>({
      query: ({ boardId, ...body }) => ({
        url: `${boardId}${ApiRoutes.STICKY}`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
})

export const { useCreateCardMutation, useCreateStickyNoteMutation, useCreateImageMutation } = miroApi

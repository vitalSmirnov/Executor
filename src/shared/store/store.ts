import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { miroApi } from '../api'
import { airtableApi } from '../api'

export const store = configureStore({
  reducer: {
    [miroApi.reducerPath]: miroApi.reducer,
    [airtableApi.reducerPath]: airtableApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(miroApi.middleware, airtableApi.middleware),
})

setupListeners(store.dispatch)

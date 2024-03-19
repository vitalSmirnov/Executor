import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { airtableApi } from '../api'

export const store = configureStore({
  reducer: {
    [airtableApi.reducerPath]: airtableApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(airtableApi.middleware),
})

setupListeners(store.dispatch)

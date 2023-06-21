import { configureStore } from '@reduxjs/toolkit'
import pokemon from './pokemon'

const store = configureStore({
  reducer: {
    pokemon,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { API } from '../api/API'
import { IPokemonDetails } from '../typings/api'

interface Pokemon {
  name: string
  url: string
  id: number
  detail: IPokemonDetails
}

interface PokemonState {
  entities: Pokemon[]
  loading: 'idle' | 'loading' | 'failed'
  error?: string
}

interface IError {
  message: string
}

export enum LOADING_STATE {
  IDLE = 'idle',
  FAILED = 'failed',
  LOADING = 'loading',
}

const initialState: PokemonState = { entities: [], loading: LOADING_STATE.IDLE }

export const fetchPokemons = createAsyncThunk<Pokemon[], void, { rejectValue: { message: string } }>(
  'pokemon/fetchPokemons',
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.getAllPokemons()
      return data.results as Pokemon[]
    } catch (error) {
      return rejectWithValue({ message: (error as IError).message })
    }
  },
)

export const fetchPokemonById = createAsyncThunk<Pokemon, number, { rejectValue: { message: string } }>(
  'pokemon/fetchPokemonById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await API.getPokemonById(id)
      return { detail: data } as Pokemon
    } catch (error) {
      return rejectWithValue({ message: (error as IError).message })
    }
  },
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.loading = LOADING_STATE.LOADING
      })
      .addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.loading = LOADING_STATE.IDLE
        state.entities = [...state.entities, ...action.payload]
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        if (action.payload) {
          state.loading = LOADING_STATE.FAILED
          state.error = action.payload.message
        } else {
          state.loading = LOADING_STATE.FAILED
          state.error = action.error.message
        }
      })
      .addCase(fetchPokemonById.fulfilled, (state, action: PayloadAction<Pokemon>) => {
        state.loading = LOADING_STATE.IDLE
        const index = state.entities.findIndex(pokemon => pokemon.name === action.payload.detail.name)
        if (index !== -1) {
          state.entities[index].detail = action.payload.detail
        }
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        if (action.payload) {
          state.loading = LOADING_STATE.FAILED
          state.error = action.payload.message
        } else {
          state.loading = LOADING_STATE.FAILED
          state.error = action.error.message
        }
      })
      .addCase(fetchPokemonById.pending, state => {
        state.loading = LOADING_STATE.LOADING
      })
  },
})

export default pokemonSlice.reducer

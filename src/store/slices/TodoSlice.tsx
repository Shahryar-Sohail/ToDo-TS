import { createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
type Card = {
  id: number;
  title: string;
  details: string;
}

type TodoState = {
  cards: Card[]
}

const initialState: TodoState = {
  cards: []
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload)
    },
    deleteCard: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload)
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload
    }
  }
})

export const { addCard, deleteCard, setCards } = todoSlice.actions
export default todoSlice.reducer

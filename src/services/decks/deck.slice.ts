import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components/ui/table'

const initialState = {
  cardsCount: [0, 100],
  searchByName: '',
  currentPage: 1,
  orderBy: null as Sort,
  itemsPerPage: 10,
}

export const decksSlice = createSlice({
  name: 'deckSlice',
  initialState,
  reducers: {
    setCardsCount: (state, action: PayloadAction<number[]>) => {
      state.cardsCount = action.payload
      state.currentPage = 1
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
      state.currentPage = 1
    },
    setOrderBy: (state, action: PayloadAction<Sort>) => {
      state.orderBy = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
  },
})

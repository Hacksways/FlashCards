import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components/ui/table'

const initialState = {
  searchByName: '',
  currentPage: 1,
  orderBy: null as Sort,
}

export const cardsSlice = createSlice({
  name: 'cardSlice',
  initialState,
  reducers: {
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
      state.currentPage = 1
    },
    setOrderBy: (state, action: PayloadAction<Sort>) => {
      state.orderBy = action.payload
      state.currentPage = 1
    },
  },
})

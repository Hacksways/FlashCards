import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Decks = {
  items: Deck[]
  pagination: Pagination
  maxCardsCount: number
}

export type Deck = {
  author: Author
  id: string
  userId: string
  name: string
  isPrivate?: boolean
  shots: number
  cover?: string | null
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export type Author = {
  id: string
  name: string
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getDecks: builder.query<Decks, void>({
        query: () => `v1/decks`,
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: body => ({
          url: 'v1/decks',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})
type CreateDeckArgs = Pick<Deck, 'name' | 'cover' | 'isPrivate'>

export const { useGetDecksQuery, useCreateDeckMutation } = baseApi

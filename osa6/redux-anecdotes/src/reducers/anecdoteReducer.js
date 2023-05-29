import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addVote(state, action) {
            const id = action.payload
            const toChange = state.find(a => a.id === id)
            const changed = { ...toChange, votes: toChange.votes + 1 }
            return state.map(a => a.id === id ? changed : a)
        },
        appendAnecdote(state, action) {
            return [ ...state, action.payload ]
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const saveVote = id => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.updateVoteCount(id)
        dispatch(addVote(updatedAnecdote.id))
    }
}

export default anecdoteSlice.reducer
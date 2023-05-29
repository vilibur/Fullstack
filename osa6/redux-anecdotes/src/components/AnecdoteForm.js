import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const [newAnecdote, setNewAnecdote] = useState('')

    const handleChange = (event) => {
        setNewAnecdote(event.target.value)
        console.log(event.target.value)
    }

    const create = async (event) => {
        event.preventDefault()
        setNewAnecdote('')
        console.log(newAnecdote)
        dispatch(createAnecdote(newAnecdote))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onChange={handleChange}>
                <div><input /></div>
                <button onClick={create}>create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm
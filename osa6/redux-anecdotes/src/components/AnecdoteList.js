import { useSelector, useDispatch } from 'react-redux'
import { saveVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(saveVote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    }

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {

    const anecdotes =
        useSelector(({ filter, anecdotes }) => {
            return anecdotes.filter(a => 
                a.content.toLowerCase().includes(filter))
        })
    return (
        <div>
            <h2>Anecdotes</h2>
                {anecdotes.sort( (a, b) => b.votes - a.votes )
                    .map(anecdote =>
                        <Anecdote
                            anecdote={anecdote} 
                            key={anecdote.id}
                        />
                )}
        </div>
    )
}

export default AnecdoteList
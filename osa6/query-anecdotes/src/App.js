import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

    const dispatch = useNotificationDispatch()

    const queryClient = useQueryClient()
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        }
    })

    const result = useQuery('anecdotes', getAnecdotes, { retry: false })
    
    if ( result.isLoading ) {
        return <div>loading data...</div>
    }
    if ( result.isError ) {
        return <div>anecdote service unavailable due to problems with the server</div>
    }

    const anecdotes = result.data

    const handleVote = (anecdote) => {
        const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        updateAnecdoteMutation.mutate(newAnecdote)
        dispatch({ type: 'SET_NOTIF', 
                   payload: `anecdote '${anecdote.content}' voted` })
        setTimeout(() => {
            dispatch({ type: 'SET_NOTIF', 
                       payload: null })
        }, 5000);
    }
    
    return (
        <div>
            <h3>Anecdote app</h3>
          
            <Notification />
            <AnecdoteForm />
          
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App

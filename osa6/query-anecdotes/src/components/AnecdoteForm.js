import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'


const AnecdoteForm = () => {

    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()

    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
        onError: () => {
            dispatch({ type: 'SET_NOTIF',
                       payload: 'anecdote too short, minimum length 5 characters' })
            setTimeout(() => {
                dispatch({ type: 'SET_NOTIF',
                           payload: null })
            }, 5000);
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        newAnecdoteMutation.mutate({ content, votes: 0 })
        
        dispatch({ type: 'SET_NOTIF',
                   payload: `new anecdote '${content}' added` })
        setTimeout(() => {
            dispatch({ type: 'SET_NOTIF',
                       payload: null})
        }, 5000);
        
  }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm

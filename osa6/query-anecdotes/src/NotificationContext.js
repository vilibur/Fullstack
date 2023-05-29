import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIF': return action.payload
        default:          return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[1]
}

export default NotificationContext
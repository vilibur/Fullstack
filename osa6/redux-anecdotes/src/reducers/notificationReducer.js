import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timer) => {
    return dispatch  => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timer*1000)

    }
}

export default notificationSlice.reducer
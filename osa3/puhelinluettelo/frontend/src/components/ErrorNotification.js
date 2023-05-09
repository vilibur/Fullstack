

const ErrorNotification = ( {message, flag} ) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

export default ErrorNotification
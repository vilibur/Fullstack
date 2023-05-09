

const SuccessNotification = ( {message, flag} ) => {
    if (message === null) {
        return null
    }

    return (
        <div className="success">
            {message}
        </div>
    )
}

export default SuccessNotification
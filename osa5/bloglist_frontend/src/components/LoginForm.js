import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, setErrorMsg }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => setUsername(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={async (event) => {
                event.preventDefault()

                try {
                    await handleLogin(
                        {
                            username,
                            password
                        })
                    setUsername('')
                    setPassword('')

                } catch (exception) {
                    console.error(exception)
                    setErrorMsg('wrong username or password')
                    setTimeout(() => {
                        setErrorMsg(null)
                    }, 5000)
                }}}
            >
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        id="username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setErrorMsg: PropTypes.func.isRequired
}

export default LoginForm
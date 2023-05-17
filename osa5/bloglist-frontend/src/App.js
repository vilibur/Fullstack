import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs]       = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser]         = useState(null)


    const [errorMsg, setErrorMsg] = useState(null)
    const [succMsg, setSuccMsg]   = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleUsernameChange = (event) => setUsername(event.target.value)

    const handlePasswordChange = (event) => setPassword(event.target.value)

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exception) {
            setErrorMsg('wrong username or password')
            setTimeout(() => {
                setErrorMsg(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        window.localStorage.clear()
        window.location.reload()
        setSuccMsg('logout successful')
        setTimeout(() => {
            setSuccMsg(null)
        }, 5000)
    }

    return (
        <div>
            <ErrorNotification message={errorMsg}/>
            <SuccessNotification message={succMsg}/>
            
            {!user &&
                <LoginForm 
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                    handleUsernameChange={handleUsernameChange}
                    handlePasswordChange={handlePasswordChange}
                />
            }
            {user &&
                <div>
                    <h2>blogs</h2>
                    <p>{user.name} logged in
                        <button onClick={(() => handleLogout())}
                        >logout</button>
                    </p>
                    <AddBlogForm 
                        setSuccMsg={setSuccMsg}
                        />

                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                </div>
            }
        </div>
    )
}

export default App
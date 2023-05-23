import { useState, useEffect, useRef } from 'react'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const [errorMsg, setErrorMsg] = useState(null)
    const [succMsg, setSuccMsg]   = useState(null)

    const blogFormRef = useRef()

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

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        await blogService.create(blogObject)
        const newList = await blogService.getAll()
        setBlogs(newList)
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`delete blog ${blog.title} by ${blog.author}?`)) {
            await blogService.remove(blog.id)
            const newList = await blogService.getAll()
            setBlogs(newList)
        }
    }

    const addLike = async (blog, likes) => {
        const updatedBlog = { ...blog, likes: likes }
        blogService.update(blog.id, updatedBlog)
    }

    const handleLogin = async (user) => {
        const returnedUser = await loginService.login(user)
        setUser(returnedUser)
        blogService.setToken(returnedUser.token)
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(returnedUser)
        )
    }

    const handleLogout = async () => {
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
            <h1>Bloglist</h1>
            {!user &&
                <Togglable buttonLabel='login'>
                    <LoginForm
                        handleLogin={handleLogin}
                        setErrorMsg={setErrorMsg}
                    />
                </Togglable>}
            {user &&
                <div>
                    <p>{user.name} logged in
                        <button onClick={(() => handleLogout())}
                        >logout</button>
                    </p>
                    <Togglable
                        buttonLabel='create new blog'
                        ref={blogFormRef}
                    >
                        <AddBlogForm
                            addBlog={addBlog}
                            setSuccMsg={setSuccMsg}
                        />
                    </Togglable>
                    <BlogList
                        blogs={blogs}
                        username={user.username}
                        addLike={addLike}
                        deleteBlog={deleteBlog}
                    />
                </div>
            }
            <Footer style={{ position: 'relative' }}/>
        </div>
    )
}

export default App
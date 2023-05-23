import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ addBlog, setSuccMsg }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return (
        <div>
            <h2>create new blog</h2>
            <form
                onSubmit={ event => {
                    event.preventDefault()
                    addBlog(
                        {
                            title: title,
                            author: author,
                            url: url
                        }
                    )
                    setSuccMsg(`a new blog ${title} by ${author} added`)
                    setTimeout(() => {
                        setSuccMsg(null)
                    }, 5000)
                    setTitle('')
                    setAuthor('')
                    setUrl('')
                }}
            >
                title:
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(({ target }) => setTitle(target.value))}
                    placeholder='add title'
                />
                <br></br>
                author:
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(({ target }) => setAuthor(target.value))}
                    placeholder='add author'
                />
                <br></br>
                url:
                <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(({ target }) => setUrl(target.value))}
                    placeholder='add url'
                />
                <br></br>
                <button type="submit" id='addblog'>add blog</button>
            </form>
        </div>
    )
}

AddBlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    setSuccMsg: PropTypes.func.isRequired
}

export default AddBlogForm
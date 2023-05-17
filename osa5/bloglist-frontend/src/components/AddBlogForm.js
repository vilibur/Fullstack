import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({ setSuccMsg }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return (
        <div>
            <h2>create new blog</h2>
            <form 
                onSubmit={((event) => {
                    event.preventDefault()
                    blogService.create(
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
                })}
            >
                title:
                <input
                    type="text"
                    name="title:"
                    value={title}
                    onChange={(({ target }) => setTitle(target.value))}
                />
                <br></br>
                author:
                <input
                    type="text"
                    name="author:"
                    value={author}
                    onChange={(({ target }) => setAuthor(target.value))}
                />
                <br></br>
                url:
                <input
                    type="text"
                    name="url:"
                    value={url}
                    onChange={(({ target }) => setUrl(target.value))}
                />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AddBlogForm
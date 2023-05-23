import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, addLike, deleteBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [showDetails, toggleDetails] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const addedByCurrentUser = username === blog.user.username

    return (
        <div
            style={blogStyle}
            className='blog'
        >
            {blog.title} {blog.author}
            <button
                className='viewbutton'
                onClick={() => toggleDetails(!showDetails)}
            >
                {showDetails ? 'hide' : 'view'}
            </button>
            <div style={{ display: showDetails ? '' : 'none' }}>
                <a href={blog.url}>{blog.url}</a> <br></br>
                likes {likes}

                <button
                    className='likebutton'
                    onClick={() => {
                        addLike(blog, likes + 1)
                        setLikes(likes + 1)
                    }}
                >
                    like
                </button>

                <br></br>
                {blog.user.name}
                <br></br>

                <button
                    className='removebutton'
                    style={{ display: addedByCurrentUser ? '' : 'none' }}
                    onClick={() => deleteBlog(blog)}
                >
                    remove
                </button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
}

export default Blog
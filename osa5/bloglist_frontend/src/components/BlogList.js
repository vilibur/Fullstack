import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, username, addLike, deleteBlog }) => {

    return (
        <div>
            <h2>blogs</h2>
            {blogs.length === 0 ? 'No blogs yet, try adding one!' : ''}
            {blogs.sort( (a, b) => b.likes - a.likes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    username={username}
                    addLike={addLike}
                    deleteBlog={deleteBlog}
                />
            )}
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}

export default BlogList
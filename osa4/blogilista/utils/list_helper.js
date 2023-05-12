const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    likes = blogs.length > 0
    ? blogs.reduce( (sum, blog) => sum + blog.likes, 0)
    : 0

    return likes
}

const favoriteBlog = (blogs) => {

    const favorite = blogs.reduce( (best, blog) => 
        best.likes ? blog.likes > best.likes ? blog : best : blog, {})

    return favorite
}

const mostBlogs = (blogs) => {

    const authorsOnly = blogs.map(blog => blog.author)

    const authorsAndCounts = authorsOnly.map( name => {
        return {
            author: name,
            blogs: authorsOnly.filter(a => a === name).length
        }
    })
    
    const most = authorsAndCounts.reduce((most, author) => {
        if (!most.blogs) return author
        if (author.blogs > most.blogs) return author
        else return most
    }, {})

    return most
}

const mostLikes = (blogs) => {
    
    const byAuthor = _.groupBy(blogs, (blog) => blog.author)
    const mostLiked = Object.keys(byAuthor).map(author => {
        return {
                author: author,
                likes: byAuthor[author].reduce((totalLikes, blog) => {
                        return totalLikes + blog.likes}, 0)
                }
    })
        .reduce((best, author) => {
            if (!best.likes) return author
            if (author.likes > best.likes) return author
            else return best
        }, {})

    return mostLiked
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
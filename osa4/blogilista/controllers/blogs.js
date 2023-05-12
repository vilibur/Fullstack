
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const { findById } = require('../../../osa3/puhelinluettelo/backend/models/person')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalide token' })
    }

    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    if (blog.title && blog.url) {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } else {
        response.status(400).json({ error: 'missing title and/or url' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(400).json({ error: 'that blog doesn\'t exist' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalide token' })
    }

    if (decodedToken.id.toString() === blog.user.toString()) {
        const deleted = await Blog
            .findByIdAndRemove(request.params.id)
        response.status(204).json(deleted)
    } else {
        response.status(403).json({ error: 'username doesn\'t match' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalide token' })
    }
    
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: decodedToken.id
    }

    const updatedNote = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote)
})

module.exports = blogsRouter

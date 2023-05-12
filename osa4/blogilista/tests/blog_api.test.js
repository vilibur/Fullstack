const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

})


test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("all blog objects have field 'id'", async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('blogs can be added correctly with POST', async () => {

    const userForToken = {
        username: 'mestarimestari',
        id: '645dfebcda7ff627ac789afc'
    }
    const token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET)

    await api
        .post('/api/blogs')
        .set('authorization', token) 
        .send(helper.newBlog)
        .expect(201)
        .expect('content-type', /application\/json/)

    const afterPost = await helper.blogsInDb()
    expect(afterPost).toHaveLength(helper.initialBlogs.length + 1)

    const titles = afterPost.map(x => x.title)
    expect(titles).toContain('Cooking99')
})

test('likes defaults to 0 if no value is given', async () => {
    
    const userForToken = {
        username: 'mestarimestari',
        id: '645dfebcda7ff627ac789afc'
    }
    const token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET)

    await api
        .post('/api/blogs')
        .set('authorization', token) 
        .send(helper.noLikes)
        .expect(201)
        .expect('content-type', /application\/json/)

    const afterPost = await helper.blogsInDb()
    expect(afterPost).toHaveLength(helper.initialBlogs.length + 1)

    const addedBlog = afterPost.find( x => x.title === helper.noLikes.title)
    expect(addedBlog.likes).toBeDefined()
    expect(addedBlog.likes).toEqual(0)
})

test('trying to save a blog without title or url returns 400', async () => {
    
    const userForToken = {
        username: 'mestarimestari',
        id: '645dfebcda7ff627ac789afc'
    }
    const token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET)

    await api
        .post('/api/blogs')
        .set('authorization', token) 
        .send(helper.noTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .set('authorization', token)
        .send(helper.noUrl)
        .expect(400)
})

test('delete correctly removes the blog', async () => {
    
    const userForToken = {
        username: 'mestarimestari',
        id: '645dfebcda7ff627ac789afc'
    }
    const token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET)

    const idToDel = helper.initialBlogs[0]._id

    await api
        .delete(`/api/blogs/${idToDel}`)
        .set('authorization', token) 
        .expect(204)
    
    const afterDel = await helper.blogsInDb()
    expect(afterDel.length).toEqual(helper.initialBlogs.length - 1)
})

test('trying to delete non-existing blog returns 400', async () => {
    const idToDel = '123'
    const userForToken = {
        username: 'mestarimestari',
        id: '645dfebcda7ff627ac789afc'
    }
    const token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET)
    
    await api
        .delete(`/api/blogs/${idToDel}`)
        .set('authorization', token) 
        .expect(400)
})

test('update correctly changes properties of the blog', async () => {
    const idToUpdate = helper.initialBlogs[0]._id
    const userForToken = {
        username: 'mestarimestari',
        id: '645dfebcda7ff627ac789afc'
    }
    const token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET)

    await api
        .put(`/api/blogs/${idToUpdate}`)
        .set('authorization', token) 
        .send(helper.updatedBlog)
        .expect(200)

    const afterUpdate = await helper.blogsInDb()
    expect(afterUpdate[0].likes).toEqual(helper.updatedBlog.likes)
})

test('adding blog fails if request is sent without token', async () => {

    await api
        .post('/api/blogs')
        .send(helper.initialBlogs[0])
        .expect(401)

})

afterAll(async () => {
    await mongoose.connection.close()
})
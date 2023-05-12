const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('./helper')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

test('trying to create invalid user fails with correct status and msg', async () => {
    const user = helper.failUser
    const result = await api.post('/api/users')
        .send(user)
        .expect(400)
        .expect('content-type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const users = await helper.usersInDb()
    expect(users).toHaveLength(helper.initialUsers.length)
})

test('trying to create invalid pass fails with correct status and msg', async () => {
    const user = helper.failPass
    const result = await api.post('/api/users')
        .send(user)
        .expect(400)
        .expect('content-type', /application\/json/)

    expect(result.body.error).toContain('invalid password')

    const users = await helper.usersInDb()
    expect(users).toHaveLength(helper.initialUsers.length)
})

test('trying to create duplicate user fails with correct status and msg', async () => {
    const user = {
        username: helper.initialUsers[0].username,
        name: "lauliq",
        password: "passiäpy",
    }
    const result = await api.post('/api/users')
        .send(user)
        .expect(400)
        .expect('content-type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const users = await helper.usersInDb()
    expect(users).toHaveLength(helper.initialUsers.length)
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'

test('renders title', () => {
    const blog = {
        title: 'Deus Vult as a hobby',
        author: 'god_almighty',
        url: 'www.knightsoflawandorder.wtf',
        likes: '123',
        user: 
            {
                name: 'mestarimestari',
            }
    }

    render(<Blog blog={blog} username='mestarimestari' />)

    const element = screen.getByText('Deus Vult as a hobby', { exact: false })
    expect(element).toBeDefined()
})

test('renders url, likes and user after clicking the button', async () => {
    const blog = {
        title: 'Deus Vult as a hobby',
        author: 'god_almighty',
        url: 'www.knightsoflawandorder.wtf',
        likes: '123',
        user: 
            {
                name: 'mestarimestari',
            }
    }

    render(<Blog blog={blog} username='mestarimestari' />)


    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('www.knightsoflawandorder.wtf', { exact: false })
    expect(element).toBeDefined()
    const element2 = screen.getByText('likes', { exact: false })
    expect(element2).toBeDefined()
    const element3 = screen.getByText('mestarimestari', { exact: false })
    expect(element3).toBeDefined()

})

test('if like button is clicked twice, the event handler is also called twice', async () => {
    const blog = {
        title: 'Deus Vult as a hobby',
        author: 'god_almighty',
        url: 'www.knightsoflawandorder.wtf',
        likes: 123,
        user: 
            {
                name: 'mestarimestari',
            }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} username='mestarimestari' addLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})


test('the callback function given as props is called with right data when adding a new blog', async () => {
    const user = userEvent.setup()
    const addBlog = jest.fn()

    render(<AddBlogForm addBlog={addBlog} setSuccMsg={() => 'yeah boi'}/>)

    screen.debug()

    const titleInput = screen.getByPlaceholderText('add title')
    const authorInput = screen.getByPlaceholderText('add author')
    const urlInput = screen.getByPlaceholderText('add url')

    const submitButton = screen.getByText('create')

    await user.type(titleInput, 'testing title')
    await user.type(authorInput, 'testing author')
    await user.type(urlInput, 'testing url')
    
    await user.click(submitButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testing title')
    expect(addBlog.mock.calls[0][0].author).toBe('testing author')
    expect(addBlog.mock.calls[0][0].url).toBe('testing url')
})

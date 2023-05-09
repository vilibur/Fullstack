require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/Person')
const { response } = require('express')

const app = express()

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })

app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'))


app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        const time = new Date()
        res.send(`<div>
                <p>Currently hosting ${count} phone numbers</p>
                <p>${time}</p>
            </div>`)
    })    
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => {
        res.json(result)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {

    Person.findById(req.params.id).then(person => {
        if (person) res.json(person)
        else res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(person => {
        if (person) res.json(person)
        else res.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    const id = Math.floor(Math.random()*10000)
    const newPerson = new Person({
        id: id,
        name: body.name,
        number: body.number
    })
    
    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true})
        .then(updatedPerson => {
            console.log(updatedPerson)
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})


const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })

app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'))

let persons = [
    {
        id: 1,
        name: "Jari Kurri",
        number: "040-9080815"        
    },
    {
        id: 2,
        name: "Timo Jutila",
        number: "4-777-444-555-555-444"
    },
    {
        id: 3,
        name: "Pasi Nurminen",
        number: "123-ilmaveivi"
    }
]

app.get('/info', (req, res) => {
    const numberOf = persons.length
    const time = new Date()
    res.send(`<div>
                <p>Currently hosting ${numberOf} phone numbers</p>
                <p>${time}</p>
            </div>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) res.json(person)
    else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) persons = persons.filter(person => person.id !== id)
    else res.status(204).end()

    res.json(person)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(req.body)
    if (!body.name) {
        return res.status(400).json({
            error: 'missing name'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'missing number'
        })
    }

    if(persons.map(person =>
        person.name).includes(body.name)) {
            return res.status(403).json({
                error: 'name already in use'
            })
    }

    const id = Math.floor(Math.random()*10000)
    const newPerson = {
        id: id,
        name: body.name,
        number: body.number
    }
    console.log(newPerson)
    persons = persons.concat(newPerson)
    res.json(newPerson)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

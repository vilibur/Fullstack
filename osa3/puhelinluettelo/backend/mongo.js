const mongoose = require('mongoose')

const args = process.argv.length

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@fullstack.oqmoowq.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const savePerson = () => {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`person ${person.name} saved!`)
        mongoose.connection.close()
    })
}

const getPeople = () => { 
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

switch (args) {
    case 3:
        getPeople()
        break
    case 5:
        savePerson()
        break
    default:
        console.log('incorrect number of arguments')
        process.exit(1)
}

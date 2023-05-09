const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
    .then(() => {
        console.log('connected to mongo')
    })
    .catch((error) => {
        console.log('error connecting to mongo:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: ((v) => {
                return (/\d{2}-\d{6}/.test(v) || /\d{3}-\d{5}/.test(v))
            }),
            message: ((props) => {
                return `${props.value} is not a valid phone number!`

            })
        },
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
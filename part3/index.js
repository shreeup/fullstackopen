const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const PhoneBookEntry = require('./models/phonebook.js')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}



const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)




app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    //res.json(persons)
    PhoneBookEntry.find({}).then(result => {
        res.json(result)
    })
})

app.get('/info', (req, res) => {
    res.send('<p>Phonebook has ' + `${PhoneBookEntry.find().count()}` + ' people.<br/>' + `${new Date()}` + '</p>')
})



app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number || false
    }
    if (PhoneBookEntry.find({ name: person["name"] }).count() > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }


    const entry = new PhoneBookEntry({
        name: person["name"],
        number: person["number"],
    })
    console.log("entry " + JSON.stringify(entry));
    entry.save().then(result => {
        console.log('Entry saved!')
        if (result) {
            response.json(result)
        } else {
            response.status(500).end()
        }
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    // const note = persons.find(note => note.id == id)

    // if (note) {
    //   response.json(note)
    // } else {
    //   response.status(404).end()
    // }
    PhoneBookEntry.findById(id).then(result => {
        // response.json(result)
        if (result) {
            response.json(result)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
    //response.json(note)
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    //console.log("indel "+request.params.id)
    // persons = persons.filter(note => note.id !== id)
    // response.status(204).end()
    PhoneBookEntry.findByIdAndDelete(id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {

    const { name, number } = request.body

    PhoneBookEntry.findByIdAndUpdate(request.params.id, { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedEntry => {
            response.json(updatedEntry)
        })
        .catch(error => next(error))
})


app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


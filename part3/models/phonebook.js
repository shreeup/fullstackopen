
const mongoose = require('mongoose')
const password="admin";

const url =process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneBookSchema = new mongoose.Schema({
name: {
    type: String,
    minLength: 5,
    required: true
},
number: String,
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.id
      delete returnedObject.__v
    }
  })



//const PhoneBookEntry = mongoose.model('Entry', phoneBookSchema)

module.exports = mongoose.model('Entry', phoneBookSchema)
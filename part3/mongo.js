const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password,name (optional),number(optional) as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster0.0ql9mmu.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneBookEntry = mongoose.model('Entry', phoneBookSchema)
if(process.argv.length>3 && process.argv.length<5){
    const entry = new PhoneBookEntry({
    name: process.argv[3],
    number: process.argv[4],
    })

    entry.save().then(result => {
    console.log('Entry saved!')
    mongoose.connection.close()
    })
}

PhoneBookEntry.find({}).then(result => {
    result.forEach(entry => {
      console.log(entry)
    })
    mongoose.connection.close()
  })
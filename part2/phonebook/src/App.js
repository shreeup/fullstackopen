import { useState, useEffect } from 'react';
import axios from 'axios'
import { Filter, Persons, PersonForm,Notification } from './Components/components.js';
import personService from './API/api.js';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setfiltered] = useState(persons)
  const [filtervalue, setfiltervalue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    personService.getAll().then(resp => {
      setPersons(resp)
      setfiltered(resp);
    })
  }, [])


  const submithandler = (newName, newNumber) => {
    let matching=persons.find(e => e.name == newName)
    if (matching){
      const personName = matching.name;
      const personId = matching.id;
      if (window.confirm(`${newName} is already added to phonebook,
      replace the old number with new one?`)) {
        personService.update(personId,{...matching,number:newNumber})
        .then(resp=>{
          setPersons(persons.map(p=>p.id!=matching.id?p:resp));
          setfiltered(persons.map(p=>p.id!=matching.id?p:resp));
          //alert(`${personName} was successfully updated`)
          setErrorMessage(`${personName} was successfully updated`);
        }).catch((error)=>{
          setErrorMessage(`${personName} could not be updated. Please retry.`);
        })
        
       
      }
    }
    else {

      personService
        .create({
          name: newName, number: newNumber,
          id: Math.max(...persons.map(o => o.id) + 1)
        })
        .then(response => {
          setPersons(persons.concat(response));
          setfiltered(persons.concat(response));
        }).catch((error)=>{
          setErrorMessage(`${newName} could not be created. Please retry.`);
        })

    }
  }

  const filterfn = (event) => {
    setfiltervalue(event.target.value)
    const regex = new RegExp(filtervalue, 'i');
    const filtered = () => persons.filter(person => person.name.match(regex))
    setfiltered(filtered)
  }

  const deletefn = (id) => {
    const filteredPerson = persons.filter(person => person.id == id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;
    if (window.confirm(`Delete ${personName} ?`)) {
      personService.deleter(personId).then(()=>{
        setPersons(persons.filter(person => person.id !== personId));
        setfiltered(persons.filter(person => person.id !== personId));
        //alert(`${personName} was successfully deleted`)
        setErrorMessage(`${personName} was successfully deleted`);
      }).catch((error)=>{
        setErrorMessage(`Error occured while deleting ${personName}.Please retry.`);
      })

     
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <h2>Filter</h2>
      <Filter filterfn={filterfn} filtervalue={filtervalue} />
      <h2>Phonebook</h2>
      <PersonForm submitfn={submithandler} />
      <h2>Numbers</h2>
      <Persons arr={filtered} all={persons} deletefn={deletefn} />
    </div>
  )
}


export default App
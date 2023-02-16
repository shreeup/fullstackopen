import { useState } from 'react';


const Filter=(props)=>{
  return (
    <div>
       <div>
          filter shown with: 
          <input name="newName" value={props.filtervalue} onChange={props.filterfn}
        />
        </div>
    </div>
  );
}


const Persons=(arr,all)=>{ 
  debugger;
  let ps=arr.arr?arr.arr:arr.all;
  var renderedOutput = ps.map(item => <div key={item.id}> {item.name} {item.number}</div>)
  return (
    <div>
      {renderedOutput}
    </div>
  );
}

const PersonForm=(props)=>{
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
    return (
      <form onSubmit={(evt)=>{
        evt.preventDefault();
        props.submitfn(newName,newNumber);
        setNewName('');setNewNumber('');
      }}  >
        <div>
          name: <input name="newName" value={newName} onChange={(event) =>
          setNewName(event.target.value)
        }/>
        <div>number: <input name="newNumber" value={newNumber}  onChange={(event) =>
          setNewNumber(event.target.value) } /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  }


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [filtered, setfiltered] = useState(persons) 
  const [filtervalue, setfiltervalue] = useState('')
  const submithandler=(newName,newNumber)=>{
    if(persons.some(e=>e.name==newName))
    alert(`${newName} is already added to phonebook`)
    else{
      const newPersons = [...persons, {name:newName,number:newNumber,
      id:Math.max(...persons.map(o => o.id)+1)} ]
    setPersons(newPersons);
    setfiltered(newPersons);
      }
  }

  const filterfn=(event)=>{
    setfiltervalue(event.target.value)
    const regex = new RegExp( filtervalue, 'i' );
    const filtered = () => persons.filter(person => person.name.match(regex))
    setfiltered(filtered)
  }

  return (
    <div>
      <h2>Filter</h2>
      <Filter filterfn={filterfn} filtervalue={filtervalue}/>
      <h2>Phonebook</h2>
      <PersonForm submitfn={submithandler}/>
      <h2>Numbers</h2>
      <Persons arr={filtered} all={persons}/>
    </div>
  )
}


export default App
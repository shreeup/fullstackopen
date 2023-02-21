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
  
  
  const Persons=(arr)=>{ 
    let ps=arr.arr?arr.arr:arr.all;
    var renderedOutput = ps.map(item => <div key={item._id}> {item.name} {item.number} &nbsp;
    <button id={item._id} onClick={(evt)=>{
      arr.deletefn(evt.target.id)}}>Delete</button></div>)
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

    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      font_size: 20,
      border_style: 'solid',
      border_radius: 5,
      padding: 10,
      margin_bottom: 10
    }

    const successtyle = {
      color: 'green',
      background: 'lightgreen',
      font_size: 20,
      border_style: 'solid',
      border_radius: 5,
      padding: 10,
      margin_bottom: 10
    }

    const Notification = ({ message }) => {
      if (!message) {
        return null
      }
    
      return (
        message.indexOf("retry")>-1?
        (<div className='error' style={errorStyle}>
          {message}
        </div>):
         (<div className='success' style={successtyle}>
            {message}
          </div>)
      )
    }

    
    export { Filter,Persons,PersonForm,Notification};
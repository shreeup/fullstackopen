import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const points = { 0: 0, 1: 0, 2: 0, 3: 0,4:0,5:0,6:0,7:0 }

const copy = { ...points };
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [mostevoted, setvoted] = useState('')
  
  let curr=0;

  const randgen=()=>{
    curr=Math.floor(Math.random() * 8);
    return curr;
  }
  
  const vote=()=>{
    points[selected]+=1;
    copy[selected] += 1;
    setvoted(mostvoted());
  }
const mostvoted=()=>{
  let elem=Object.keys(copy).reduce((a, b) => copy[a] > copy[b] ? a : b);
return anecdotes[elem];
}
  return (
    <div>
      {anecdotes[selected]}
      <br/>
      <Button onClick={()=>
          vote()
        }
       text="vote" />&nbsp;
      <Button onClick={()=>
       setSelected(randgen())
      }
       text="next anecdote" />
       <h4>Anecdote with most votes</h4>
       <p>
        
<div>{mostevoted}</div>
       </p>
    </div>
  )
}

export default App
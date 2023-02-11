import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics=(props)=>{
  const {good,neutral,bad,all,average,positive}=props;
return(
  <div>
    <table>
      <tbody>
        <tr><td>Good</td><td>{good}</td></tr>
        <tr><td>Neutral</td><td>{neutral}</td></tr>
        <tr><td>Bad</td><td>{bad}</td></tr>
        <tr><td>All</td><td>{all}</td></tr>
        <tr><td>Average</td><td>{average}</td></tr>
        <tr><td>Positive</td><td>{positive}</td></tr>
      </tbody>
    </table>
  </div>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const getaverage=()=>{
    let sum=(good+neutral+bad);
    if(sum==0)
      return 0;
    else return (good-bad)/sum;
  }

  const getpositiveaverage=()=>{
    let sum=(good+neutral+bad);
    if(sum==0)
      return 0;
    else return (good)/sum;
  }
  const p={"good":good,"neutral":neutral,"bad":bad,
  "all":good+neutral+bad, "average":getaverage(),"positive":getpositiveaverage()
}
  return (
    <div>
      <h4>give feedback</h4>
      <Button onClick={()=>setGood(good+1)} text="good" />
      <Button onClick={()=>setNeutral(neutral+1)} text="neutral" />
      <Button onClick={()=>setBad(bad+1)} text="bad" />
      <h4>Statistics</h4>
      <Statistics {...p}/> 
    </div>
  )
}

export default App
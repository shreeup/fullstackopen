import  counterReducer  from './reducer'
import { useSelector, useDispatch } from 'react-redux'
import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import reducer from "./reducer";


// const App = () => {
//   const dispatch = useDispatch()
//   const notes = useSelector(state => state)
// debugger;
//   console.log(notes);

//   return (
//     <div>
      
//       <ul>
//         {notes.map((note,i) =>
//           <li
//             key={i} 
           
//           >
//           as
//           </li>
//         )}
//       </ul>
//     </div>
//   )
// }

const store = createStore(counterReducer)

const App = () => {
    return (
      <div>
        <button onClick={() => store.dispatch({type: 'GOOD'})}>good</button>
        <button onClick={() => store.dispatch({type: 'OK'})}>neutral</button>
        <button onClick={() => store.dispatch({type: 'BAD'})}>bad</button>
        <button onClick={() => store.dispatch({type: 'ZERO'})}>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>neutral {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    )
  }
App()
const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
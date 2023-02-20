import { useState,useEffect } from 'react'
import CountryList  from './components/CountryList'
import axios from 'axios'

const App = () => {

   
  const [contries, setContries] = useState([])
  const [Lst,setLst]=useState([]);
  const [srchStr, setsrchStr] = useState('')
  useEffect(() => {
      console.log('fetching country details...')
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          setLst(response.data)
        })
  }, []);
  const onSearch = (event) => {
    event.preventDefault()
    setsrchStr(event.target.value)
    if (srchStr) {
      const regex = new RegExp(srchStr, 'ig' );
      const filteredCountries = () => Lst.filter(ctry => ctry.name["common"].match(regex))
      const fil=filteredCountries();
      setContries(fil)
    }
  }

  return (
    <div>
      <div> filter countries : 
        <input name="country" value={srchStr} onChange={onSearch}/>
         <CountryList countries={contries} setCountries={setContries} />
      </div>
    </div>
  )
}

export default App
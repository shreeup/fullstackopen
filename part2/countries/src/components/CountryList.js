import { useState,useEffect } from 'react'
import CountryDetail from './CountryDetail.js';

const CountryList=({countries,setCountries})=>{ 
    
        const [selectedCountry, setSelectedCountry] = useState();

        useEffect(() => {
          if (countries.length === 1) {
            setSelectedCountry(countries[0]);
          }
          else{
            setSelectedCountry();
          }
        }, [countries]);
      
        const listOfCountries = countries.map((country) => (
          <div key={country.alpha2Code}>
            {country.name["common"]}
            <button onClick={() => setSelectedCountry(country)}>show</button>
          </div>
        ));
      
        return (
          <div>
            {countries.length > 10 && <div>There are too many matches, please specific another filter</div>}
            {countries.length >1 && countries.length<10 && listOfCountries}
            {selectedCountry && <CountryDetail country={selectedCountry} />}
          </div>
        );
  }

  export default CountryList
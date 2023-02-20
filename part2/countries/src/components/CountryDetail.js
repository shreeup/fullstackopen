import { useState,useEffect } from 'react'
import axios from 'axios'

const CountryDetail=({country})=>{ 
    const [weather,setWeather]=useState([]);
    useEffect(() => {
        const params = {
          access_key: process.env.REACT_APP_API_KEY,
          query: country.capital[0]
        }
        const instance = axios.create();
        instance.defaults.baseURL="http://api.weatherstack.com";

        instance.get('/current', {params})
          .then(response => {
            const apiResponse = response.data;
            console.log(apiResponse)
            console.log(`Current temperature in 
            ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
            setWeather([apiResponse])
          }).catch(error => {
            console.log(error);
        })

    //     axios
    //     .get(`https://api.apixu.com/v1/current.json?key=fda124a179ba417e8b4155251190908&q=${ country.capital[0] }`)
    //     .then(response => {
    //         setWeather(response.data)
    //     })
    //     .catch(error => {
    //             console.log(error);
    //         })
  })

      if(weather.length>0){
        const currentWeather = weather[0].current
        return (
        <div>
            <h1>{country["name"]["common"]}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h2>Spoken languages</h2>
            <ul>
                {
                    Object.keys(country.languages).forEach(function(key,index){
                        <li key={key}>{country.languages[key]}</li>
                    })
                }
           
            </ul>
            <img src={country.flag} alt="Country flag"></img>
            <h2>Weather in {country.capital}</h2>
            <p>temperature: {currentWeather.temperature}° Celcius</p>
            <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
            <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
        </div>
        )
      }

      return (
        <div>
          <h1>{country.name["common"]}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h2>Spoken languages</h2>
          <ul>
            {
             Object.keys(country.languages).forEach(function(key,index){
                <li key={key}>{country.languages[key]}</li>
            })
            }
          </ul>
          <img src={country.flag} alt="Country flag"></img>
        </div>
      )


}
export default CountryDetail;
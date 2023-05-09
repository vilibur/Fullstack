import apiQuery from '../services/apiQuery'
import { useEffect, useState } from 'react'

const Weather = ( {country} ) => {

    const [currentWeather, setWeather] = useState([])

    useEffect(() => {
        apiQuery.getWeather(country.capital).then(response => {
            setWeather(response)
        })
    }, []) 
    
    if (currentWeather.length === 0) return <div></div>
    else {
        return (
            <div>
                <p>{`temperature: ${Math.round((currentWeather.main.temp - 273.15) * 10)/10} °C`}</p>
                <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                    alt={currentWeather.weather.icon}
                />
                <p>{`wind: ${currentWeather.wind.speed} m/s`}</p>
            </div>
        )
    }
}

export default Weather
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const getCountries = () => {

    const url = 'https://restcountries.com/v3.1/all'
    const response = axios.get(url)
    
    return response.then(response => response.data)

}

const getWeather = (city) => {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const response = axios.get(url).then(response => response.data)
    return response
}

export default {
    getCountries: getCountries,
    getWeather: getWeather
}
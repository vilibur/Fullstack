import Weather from './Weather'

const CountryStats = ( {country} ) => {
    const languages = Object.values(country.languages)
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <p>area: {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {languages.map(language => 
                                    <li key={language}>
                                        {language}
                                    </li>)}
            </ul>
            <img src={country.flags.png} 
                alt={country.flags.alt}
                style={{border: '1px solid black'}}
            />
            <div>
                <h2>Weather in {country.capital}</h2>
                <Weather 
                    country={country}
                />
            </div>
        </div>
    )
}

export default CountryStats
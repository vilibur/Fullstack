import CountryName from './CountryName'
import CountryStats from './CountryStats'

const Countries = ( {countries, newFilter, handleClick} ) => {
    
    if (countries) {
        const filteredCountries = 
            countries.filter(country => 
                country.name.common.toLowerCase().includes(newFilter))
        const numberOf = filteredCountries.length
        if (numberOf > 10) {
            return <p>Too many countries, specify another filter</p>
        } else if (numberOf === 1) {
            return <CountryStats 
                        country={filteredCountries[0]}
                    />
        } else {
            return filteredCountries
                    .map(country => 
                        <CountryName 
                            country={country}
                            handleClick={handleClick} 
                            key={country.name.common} 
                        />) 
        }
    } else {
        return null
    }
    
}

export default Countries
import { useEffect, useState } from 'react'
import FilterInput from './components/FilterInput'
import Countries from './components/Countries'
import apiQuery from './services/apiQuery'

const App = () => {

    const [countries, setCountries] = useState([])
    const [newFilter, setFilter] = useState('')


    useEffect(() => {
        apiQuery.getCountries().then(response => {
            setCountries(response)
        })
    }, [])

    const handleFilter = (event) => {
        setFilter(event.target.value.toLowerCase())
    }

    const handleClick = (country) => {
        setFilter(country.name.common.toLowerCase())
    }

    return (
        <div>
            <FilterInput 
                newFilter={newFilter}
                handleFilter={handleFilter} />
            <Countries 
                countries={countries}
                newFilter={newFilter}
                handleClick={handleClick} />
        </div>
    )
}

export default App

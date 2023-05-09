const CountryName = ( {country, handleClick} ) => {
    return (
        <div>
            {country.name.common}
            <button
                key={country.name.common} 
                onClick={(() => {
                    handleClick(country)
                }
                )}>
                show
            </button>
        </div>
    )
}

export default CountryName
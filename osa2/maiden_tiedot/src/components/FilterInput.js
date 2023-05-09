const FilterInput = ( {newFilter, handleFilter} ) => {
    return (
        <div>
            find countries
            <input 
                value={newFilter}
                onChange={handleFilter}/>
        </div>
    )
}

export default FilterInput
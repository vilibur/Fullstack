const FilterInput = ( {newFilter, handleFilter} ) => {
    return (
        <div>
            filter shown with
            <input 
                value={newFilter}
                onChange={handleFilter}/>
        </div>
    )
}

export default FilterInput
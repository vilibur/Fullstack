import Person from './Person'

const Persons = ( {
    persons,
    newFilter,
    handleDelete
    } ) => {
    return (
        persons.filter( person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase()))
                .map( person => 
                    <Person
                        person={person}
                        key={person.id}
                        handleDelete={handleDelete} />)
    )
}

export default Persons
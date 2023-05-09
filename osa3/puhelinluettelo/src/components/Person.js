const Person = ( {person, handleDelete} ) => {
    return (
        <div>
            <p>{person.name} {person.number}
            <button 
                key={person.id} 
                onClick={() => {
                    window.confirm(`are you sure you want to delete ${person.name}`)
                    ? handleDelete(person)
                    : console.log("ei sit")
                    }
                }>
            delete
            </button>
            </p>
        </div>
    )
}

export default Person
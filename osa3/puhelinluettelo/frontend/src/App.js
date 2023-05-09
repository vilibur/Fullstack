import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import FilterInput from './components/FilterInput'
import AddPersonForm from './components/AddPersonForm'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import useServer from './services/useServer'

const App = () => {

    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [newFilter, setFilter] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)

    useEffect(() => {
        useServer
        .fetchList()
        .then(response => {
            setPersons(response)
        })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        const personsLC = persons.map(person => person.name.toLowerCase())
        const newNameLC = newName.toLowerCase()

        if (personsLC.includes(newNameLC)) {

            if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
                const oldPerson = persons.find(person => person.name.toLowerCase() === newNameLC)
                const newPerson = {...oldPerson, number: newNumber}
                useServer.changeNumber(newPerson)
                    .then(response => {
                        useServer
                        .fetchList()
                        .then(response => setPersons(response))
                        setSuccessMsg(`Changed number for ${newName}`)
                        setTimeout(() => {
                            setSuccessMsg(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMsg(`Couldn't change the number for ${newName}`)
                        setTimeout(() => {
                          setErrorMsg(null)
                        }, 5000)
                      }) 
            }
                setNewName('')
                setNumber('')
        } else {
            useServer
                .savePerson( {newName, newNumber} )
                .then(response => {
                    useServer
                        .fetchList()
                        .then(response => setPersons(response))
                    setSuccessMsg(`Added ${newName}`)
                    setTimeout(() => {
                        setSuccessMsg(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMsg(error.response.data.error)
                    setTimeout(() => {
                    setErrorMsg(null)
                }, 5000)
                })
            setNewName('')
            setNumber('')
        }
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const handleDelete = (person) => {
        useServer.deletePerson(person.id)
            .then(response => {
                useServer
                    .fetchList()
                    .then(response => setPersons(response))
                setSuccessMsg(`Deleted ${person.name}`)
                setTimeout(() => {
                    setSuccessMsg(null)
                }, 5000)
            })
            .catch(error => {
                useServer
                    .fetchList()
                    .then(response => setPersons(response))
                setErrorMsg(`That number is already deleted!`)
                setTimeout(() => {
                setErrorMsg(null)
                }, 5000)
          })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <ErrorNotification message={errorMsg}/>
            <SuccessNotification message={successMsg}/>
            <FilterInput 
                newFilter={newFilter}
                handleFilter={handleFilter} />
            <h2>add a new</h2>
            <AddPersonForm 
                addPerson={addPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber} />
            <h2>Numbers</h2>
            <Persons 
                persons={persons}
                newFilter={newFilter}
                handleDelete={handleDelete} />
        </div>
    )

}

export default App
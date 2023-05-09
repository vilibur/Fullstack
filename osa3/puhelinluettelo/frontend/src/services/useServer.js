import axios from 'axios'

const url = '/api/persons'

const fetchList = () => {
    const response = axios.get(url)
    return response.then(response => response.data)
}

const savePerson = ( {newName, newNumber} ) => {
    const personObject = {
        name: newName,
        number: newNumber
    }
    const newPerson = axios.post(url, personObject)
    return newPerson.then(response => response.data)
}

const deletePerson = id => {
    const personUrl = `${url}/${id}`
    const response = axios.delete(personUrl)
    return response
}

const changeNumber = person => {
    const personUrl = `${url}/${person.id}`
    const response = axios.put(personUrl, person)
    return response
}

export default {
    fetchList,
    savePerson,
    deletePerson,
    changeNumber
}
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const verifyDuplicates = (props) => props.some(person => (person.name === newName) || (person.number === newNumber))

  const addPerson = (event) => {
    event.preventDefault()

    if (verifyDuplicates(persons) == true) {
      if ((window.confirm(`${newName} or ${newNumber} is already added to phonebook, replace the old number with a new one?`))) {

        const personObject = { name: newName, number: newNumber }
        let arrayId = 0

        console.log(personObject);

        let arrayUpdated = persons.map(function(props){
          console.log(props)
          if (props.name == newName) {
            arrayId = props.id
            console.log(arrayId);
            return { name: props.name, number: newNumber, id:props.id}
          }
          else{
            return { name: props.name, number: props.number, id:props.id }
          }
        })

        console.log(arrayUpdated);
        console.log(arrayId);

          setPersons(arrayUpdated)
          personsService
            .update(arrayId, personObject)
            .then(returnedPerson => {
              setPersons(arrayUpdated)

              setNewName('')
              setNewNumber('')
            })
      }
    }

    else {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject))

      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (propID, propName) => {
    if (window.confirm(`Delete '${propName}' ?`)) {
      personsService.deleteItem(propID)
      setPersons(persons.filter(object => !object.id.includes(propID)))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setPersons(persons.filter(function (object) {
      return object.name.includes(event.target.value)
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilterValue={newFilter} onChangeFunction={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm newNameValue={newName} onNameChangeFunction={handleNameChange} newNumberValue={newNumber} onNumberChangeFunction={handleNumberChange} functionButton={addPerson} />

      <h2>Numbers</h2>

      <PersonList array={persons} functionButtonDelete={deletePerson} />

    </div>
  )
}

export default App
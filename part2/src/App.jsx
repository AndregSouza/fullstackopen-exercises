import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import personsService from './services/persons'
import './index.css'

const verifyDuplicates = function(persons, inputPersonObject) {
  return persons.some((currentArray) => {
    if (((currentArray.name === inputPersonObject.name) || (currentArray.number === inputPersonObject.number)) == true) {
      return true
    }
  })
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setNewFilteredPersons] = useState ([])
  const [notifications, setNotificationMessage] = useState(null)



  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setNewFilteredPersons(initialPersons)
      })
  }, [])



  const addPerson = (event) => {
    event.preventDefault()
    const inputPersonObject = { name: newName, number: newNumber }

    if (verifyDuplicates(persons,inputPersonObject) == true){
      if (window.confirm(`${newName} or ${newNumber} is already added to phonebook, replace the old number with a new one?`)){
        return updatePerson(inputPersonObject)
      }
    }

    else {
      setPersons(persons.concat(inputPersonObject))

      personsService
        .create(inputPersonObject)
        .then(returnedPerson => {
          console.log(returnedPerson);
          
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);

          setPersons(persons.concat(returnedPerson))
          setNewFilteredPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch
    }
  }

  const updatePerson = (inputPersonObject) => {
    
    let arrayId = 0

    let arrayUpdated = persons.map(function(props){

      if (props.name == newName) {
        arrayId = props.id
        return { name: props.name, number: newNumber, id:props.id}
      }
      else{
        return { name: props.name, number: props.number, id:props.id }
      }
    })

      setPersons(arrayUpdated)
      personsService
        .update(arrayId, inputPersonObject)
        .then(returnedPerson => {
          console.log(returnedPerson);
          setNotificationMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);
          setPersons(arrayUpdated)
          setNewFilteredPersons(arrayUpdated)
          setNewName('')
          setNewNumber('')
        })
  }

  const deletePerson = (propID, propName) => {
    if (window.confirm(`Delete '${propName}' ?`)) {
      personsService.deleteItem(propID)
      setPersons(persons.filter(object => !object.id.includes(propID)))
      setNewFilteredPersons((persons.filter(object => !object.id.includes(propID))))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value)
    setNewFilteredPersons(persons.filter(function (object) {
      return object.name.includes(event.target.value)
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notifications} />

      <Filter newFilterValue={newFilter} onChangeFunction={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm newNameValue={newName} onNameChangeFunction={handleNameChange} newNumberValue={newNumber} onNumberChangeFunction={handleNumberChange} functionButton={addPerson} />

      <h2>Numbers</h2>

      <PersonList array={filteredPersons} functionButtonDelete={deletePerson} />

    </div>
  )
}

export default App
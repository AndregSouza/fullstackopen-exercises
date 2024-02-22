import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    let sameName = false
    let sameNumber = false

    persons.map(object => {if (object.name == newName) {sameName = true} })
    persons.map(object => {if (object.number == newNumber) {sameNumber = true} })

    if ((sameName == true) || (sameNumber == true)) {
      return alert(`${newName} ou ${newNumber} is already added to phonebook`)
    }
    else {
      const personObject = {name: newName, number: newNumber}
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    console.log(event.target.value);
    setNewFilter(event.target.value)
    console.log(newFilter);
    setPersons(persons.filter(function(object){
      console.log(object);
      return object.name.includes(event.target.value)
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilterValue = {newFilter} onChangeFunction = {handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm newNameValue = {newName} onNameChangeFunction = {handleNameChange} newNumberValue = {newNumber} onNumberChangeFunction = {handleNumberChange} functionButton = {addPerson} />

      <h2>Numbers</h2>

      <PersonList array = {persons}/>

    </div>
  )
}

export default App
/*
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import personsService from './services/persons'
import './index.css'

const verifyDuplicates = function (persons, inputPersonObject) {
  return persons.some((Array) => {
    if (Array.name === inputPersonObject.name) {
      return true
    }
  })
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setNewFilteredPersons] = useState([])
  const [notification, setNotification] = useState({ message: null, type: '' });

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

    if (verifyDuplicates(persons, inputPersonObject)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return updatePerson(inputPersonObject)
      }
    }
    else {
      setPersons(persons.concat(inputPersonObject))

      personsService.create(inputPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewFilteredPersons(persons.concat(returnedPerson))

          setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotification({ message: `Error: ${error.message}`, type: 'error' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
        });
    }
  }

  const updatePerson = (inputPersonObject) => {

    let arrayId = 0

    let arrayUpdated = persons.map(function (props) {

      if (props.name == newName) {
        arrayId = props.id
        return { name: props.name, number: newNumber, id: props.id }
      }
      else {
        return { name: props.name, number: props.number, id: props.id }
      }
    })

    setPersons(arrayUpdated)

    personsService
      .update(arrayId, inputPersonObject)
      .then(returnedPerson => {
        setNotification({ message: `Updated ${returnedPerson.name}`, type: 'success' });
        setTimeout(() => {
          setNotification({ message: null, type: '' });
        }, 5000);
        setPersons(arrayUpdated)
        setNewFilteredPersons(arrayUpdated)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotificationMessage(`Information of ${inputPersonObject.name} has already been removed from the server`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000);
      })
  }

  const deletePerson = (propID, propName) => {
    console.log(propID);
    if (window.confirm(`Delete '${propName}' ?`)) {
      personsService.deleteItem(propID)
      setPersons(persons.filter(object => !object.id.includes(propID)))
      setNewFilteredPersons((persons.filter(object => !object.id.includes(propID))))
    }
  }

  const handleNameChange = (event) => {
    const filterValue = event.target.value
    setNewName(filterValue)
  }

  const handleNumberChange = (event) => {
    const filterValue = event.target.value
    setNewNumber(filterValue)
  }

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setNewFilter(filterValue)
    setNewFilteredPersons(persons.filter(function (object) {
      return object.name.includes(filterValue)
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} type={notification.type} />

      <Filter newFilterValue={newFilter} onChangeFunction={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm 
        newNameValue={newName} 
        onNameChangeFunction={handleNameChange} 
        newNumberValue={newNumber} 
        onNumberChangeFunction={handleNumberChange} 
        functionButton={addPerson} 
      />

      <h2>Numbers</h2>

      <PersonList array={filteredPersons} functionButtonDelete={deletePerson} />

    </div>
  )
}

export default App
*/

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import personsService from './services/persons'
const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [filter, setFilter] = useState('')
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [capital, setCapital] = useState(null)
  const [weatherOfCapital, setWeatherOfCapital] = useState(null)


  useEffect(() => {
    personsService
      .getAll()
      .then(initialList => {
        setResults(initialList)
        setFilteredResults(initialList)
      })
  }, [])

  useEffect(() => {
    console.log('effect run, capital is now', capital);
    console.log(capital);

    if (capital) {
      console.log('fetching weather', capital);
      personsService
        .getWeather(capital, api_key)
        .then(initialWeather => {
          setWeatherOfCapital(initialWeather)
        })
    }
  }, [capital])

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setFilter(filterValue)
    setFilteredResults(results.filter(function (object) {
      return object.name.common.includes(filterValue)
    }))
  }


  const handleClickChange = (event) => {
    setCapital(event)
    setFilteredResults(results.filter(function (object) {
      return object.name.common.includes(event)
    }))
  }

  return (
    <>
      <Filter filterValue={filter} onChangeFunction={handleFilterChange} />
      <ul>
        <List array={filteredResults} weather={weatherOfCapital} onClickFunction={handleClickChange} />
      </ul>
    </>
  )
}

export default App
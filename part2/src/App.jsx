import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    let sameName = false
    let sameNumber = false

    //verify for duplicates in the array
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

  const handleFilterChange =(event) =>{
    console.log(event.target.value);
    setNewFilter(event.target.value)
    // needs an updater function because React states asynchronously)
    console.log(newFilter);
    setPersons(persons.filter(function(object){
      console.log(object);
      return object.name.includes(event.target.value)
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with 
          <input 
            value ={newFilter}
            onChange = {handleFilterChange}
          />
        </div>
      </form>
      
      <h2>add a new</h2>
      <form>
        <div>
          name: 
          <input 
            value ={newName}
            onChange = {handleNameChange}
          />
        </div>
        <div>
          number: 
          <input 
            value ={newNumber}
            onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(function(prop,i){
        return(
          <>
            <li key = {i} >{prop.name} / {prop.number} </li>
          </>
        )
      })}
    </div>
  )
}

export default App
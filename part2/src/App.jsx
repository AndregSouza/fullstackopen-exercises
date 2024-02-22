import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '123456'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(function(prop){
        return(
          <>
            <li>{prop.name} , {prop.number} </li>
          </>
        )
      })}
    </div>
  )
}

export default App
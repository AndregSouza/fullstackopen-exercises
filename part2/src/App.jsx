import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')  

  const addName = (event) => {
    event.preventDefault()
    let sameName = false
    console.log(newName, persons)
    persons.map(function(object){
      if (object.name == newName) {
        sameName = true
      }
      else {
        sameName = false
      }
    })

    if (sameName == true) {
      return alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {name: newName}
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: 
          <input 
            value ={newName}
            onChange = {handleNoteChange}
          />
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(function(prop){
        return(
          <li>{prop.name}</li>
        )
      })}
    </div>
  )
}

export default App
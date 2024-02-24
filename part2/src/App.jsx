/*
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import personsService from './services/persons'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setResults(initialPersons)
        setFilteredResults(initialPersons)
      })
  }, [])

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setNewFilter(filterValue)
    setFilteredResults(results.filter(function (object) {
      return object.name.common.includes(filterValue)
    }))
  }

  return (
    <>
      <Filter newFilterValue={newFilter} onChangeFunction={handleFilterChange} />
      <ul>
        <List array={filteredResults} />
      </ul>
    </>
  )
}

export default App

*/

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import personsService from './services/persons'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setResults(initialPersons)
        setFilteredResults(initialPersons)
      })
  }, [])

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setNewFilter(filterValue)
    setFilteredResults(results.filter(function (object) {
      return object.name.common.includes(filterValue)
    }))
  }

  return (
    <>
      <Filter newFilterValue={newFilter} onChangeFunction={handleFilterChange} />
      <ul>
        <List array={filteredResults} />
      </ul>
    </>
  )
}

export default App
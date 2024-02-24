const PersonList = (object) => {
  return object.array.map(
    function (prop, index) {
      return (
          <li key={index}> {prop.name} / {prop.number}
            <button key = {index} onClick={() => object.functionButtonDelete(prop.id, prop.name)} type="delete">delete</button>
          </li>
      )
    }
  )
}

export default PersonList
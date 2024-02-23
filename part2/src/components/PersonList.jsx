const PersonList = (object) => {
  return (
    <>
      {object.array.map(
        function (prop, i) {
          return (
            <>
              <li key={i}> {prop.name} / {prop.number} 
                <button onClick = {() => object.functionButtonDelete(prop.id, prop.name)} type="delete">delete</button>
              </li>
            </>
          )
        }
      )
      }
    </>
  )
}

export default PersonList
const PersonList = (object) => {
    return(
      <>
        {object.array.map((prop,i) => <li key = {i} >{prop.name} / {prop.number} </li>)}
      </>
    )
  }

export default PersonList
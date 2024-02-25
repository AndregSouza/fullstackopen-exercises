const List = (object) => {

  console.log(object);

  const country = object.array[0]
    
  if (object.array.length > 11) {
    return <li> Too many matches, specify another filter </li>
  }

  else if ((object.array.length === 1) && (object.weather != null)) {
    
    let valuesOfLanguage = Object.values(country.languages)

    return (
      <>
        <h1> {country.name.common} </h1>
        <li> {country.capital} </li>
        <li> {country.area} </li>
        <ul>
        </ul>
        <h2> Languages </h2>
        
        {valuesOfLanguage.map(function (prop, i){
          return(
            <li> {prop} </li>
          )
        })}

        <br />
        <br />
        <img src={country.flags.png} alt="" />

        <h2>Weather in {country.capital} </h2>
        <li>{object.weather.main.temp}</li>
        <li>{object.weather.wind.speed}</li>
      </>
    )
  }

  else {
    return object.array.map(
      function (prop, index) {
        console.log(prop, prop.length);
        return (
            <li> {prop.name.common}
            <button onClick={() => object.onClickFunction(prop.name.common)}>show</button>
            </li>
        )
      }
    )
  }
}

export default List

/*  
*/
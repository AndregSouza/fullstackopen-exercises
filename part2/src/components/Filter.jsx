const Filter = (object) => {
  return (
    <form>
        <div>
          filter shown with 
          <input 
            value = {object.newFilterValue}
            onChange = {object.onChangeFunction}
          />
        </div>
    </form>
  )
}

export default Filter
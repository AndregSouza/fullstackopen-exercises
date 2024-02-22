const PersonForm = (object) => {
    return(
        <form>
            <div>
                name: 
                <input 
                    value ={object.newNameValue}
                    onChange = {object.onNameChangeFunction}
                />
            </div>
            <div>
                number: 
                <input 
                    value ={object.newNumberValue}
                    onChange = {object.onNumberChangeFunction}
                />
            </div>
            <div>
                <button onClick={object.functionButton} type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm


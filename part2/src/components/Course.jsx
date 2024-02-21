const ListCourses = ({props}) => {
    return(
      <>
        {props.map(function(course){
          return (
            <>
              <h1 key = {course.id}>{course.name}</h1>
              <ul> 
              {course.parts.map(list => <li key = {list.id}> {list.name} </li>)}
              </ul>
            </>
          )
        })}
      </>
    )
  }

export default ListCourses
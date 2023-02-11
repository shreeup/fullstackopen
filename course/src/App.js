const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header=(props)=>{
    return (
      <h1>{props.course}</h1>
    )
  }
  const Part =(props)=>{
    return(
      <p>{props.prop.name} {props.prop.exercises}</p>
    )
  }

  const Content=(props)=>{
    return (
      <>
     <Part prop={props.parts[0]}/>
     <Part prop={props.parts[1]} />
     <Part prop={props.parts[2]} />
      </>
    )
  }

  const Total=(props)=>{
    //const {exercises1 , exercises2 , exercises3}=ex;
    return (
      <>
     <p>Number of exercises {props.parts[0].exercises + 
     props.parts[1].exercises + props.parts[2].exercises}</p>
      </>
    )
  }

  
  return (
    <div>
      <Header  course={course.name}  />
      <Content  parts={course.parts} />
      <Total parts={course.parts}/> 
    </div> 
  )
}

export default App
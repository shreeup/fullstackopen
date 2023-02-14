//const Header = ({ course }) => <h1>{course}</h1>

function Header (course){
  return (
    <h1>{course.course.name}</h1>
  )
}

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
  <>{
    parts.map((part,i)=>
    { 
      return (
        <>
        <Part part={part} />  
        </>
      )
    }
    )
  }
  </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  const total =(parts)=> {
    let t=0;
    parts.map((s,p)=>{
      t+=s["exercises"];
      return t;
    })
    //courses[index].parts.reduce((s, p) => {
    
  //})
  return t;
}

  return (
    <div>
      {
        courses.map((course,i)=>
          { 
            return (
              <div id={course.id}>
              <Header course={course} />
              <Content parts={course.parts} />
              <Total sum={total(course.parts)} />
              </div>
            )
          }
        )
      }
    </div>
  )
}

export default App
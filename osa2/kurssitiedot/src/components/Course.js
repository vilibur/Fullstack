const Header = ( {course} ) => {
    return (
      <div>
        <h2>{course}</h2>
      </div>
    )
}

const Part = ( {part} ) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Parts = ( {parts} ) => {
    return (
        <div>
            {parts.map( (part, i) => <Part key={i} part={part} />)}
        </div>
    )
}

const Exercises = ( {parts} ) => {
    const exercises = parts.map(i => i.exercises)
    const total = 
        exercises.reduce( (a, b) => a + b, 0 )
    return (
        <div>
            <h3>total of {total} exercises</h3>
        </div>
    )
}

const Course = ( {course} ) => {
    return (
        <div>
            <Header course={course.name} />
            <Parts parts={course.parts} />
            <Exercises parts={course.parts} />
        </div>
    )
}

export default Course
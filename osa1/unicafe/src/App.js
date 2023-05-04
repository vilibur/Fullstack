import { useState } from 'react'

// oikea paikka komponentin määrittelyyn
const Statistics = ({ good, bad, neutral }) => {
  const all = good+bad+neutral
  const avg = (good-bad)/3
  const pos = good/all*100 + " %"
  if (all == 0) {
    return <div>No feedback given</div>
  } else {
    return (
      <table>
        <tbody>
          <StatisticsLine title="good" number={good} />
          <StatisticsLine title="neutral" number={neutral} />
          <StatisticsLine title="bad" number={bad} />
          <StatisticsLine title="all" number={all} />
          <StatisticsLine title="avg" number={avg} />
          <StatisticsLine title="pos" number={pos} />
        </tbody>
      </table>
    )
  }
}
const StatisticsLine = ({ title, number }) => {
  return (
    <tr>
      <td>{title}</td>
      <td> {number}</td>
    </tr>
  )
}
const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
      
    </div>
  )
}

export default App
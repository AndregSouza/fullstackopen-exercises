import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = () => setGood(good + 1)
  const increaseByOne1 = () => setNeutral(neutral + 1)
  const increaseByOne2 = () => setBad(bad + 1)

  return (
    <div>
      <Title text = 'give feedback'/>
      <button onClick={increaseByOne}> good </button>
      <button onClick={increaseByOne1}> neutral </button>
      <button onClick={increaseByOne2}> bad </button>
      <Title text = 'statistics'/>
      <StatisticLine text = 'good' value = {good}/>
      <StatisticLine text = 'neutral' value = {neutral}/>
      <StatisticLine text = 'bad' value = {bad}/>
    </div>
  )
}

const Title = ({text}) => {
  return(
    <h1>
      {text}
    </h1>
  )
}

const StatisticLine = (props) =>{
  return(
    <p>
      {props.text} {props.value}
    </p>
  )
}

export default App
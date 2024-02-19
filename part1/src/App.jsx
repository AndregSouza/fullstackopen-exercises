import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const average = (good - bad) / (all.length)
  const positive = (good / (all.length)) * 100

  const increaseByOne = () => {
    setGood(good + 1)
    setAll(all.concat(1))
  }

  const increaseByOne1 = () => {
    setNeutral(neutral + 1)
    setAll(all.concat(1))
  }
  const increaseByOne2 = () => {
    setBad(bad + 1)
    setAll(all.concat(1))
  }

  return (
    <div>
      <Title text = 'give feedback'/>
      <button onClick={increaseByOne}> good </button>
      <button onClick={increaseByOne1}> neutral </button>
      <button onClick={increaseByOne2}> bad </button>
      <Title text = 'statistics'/>
      <Statistics goodCount = {good} neutralCount = {neutral} badCount = {bad} allCount = {all} averageCount = {average} positiveCount = {positive} />
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

const Statistics = (props) => {
  console.log(props)
  
  if(props.goodCount == 0 && props.neutralCount == 0 && props.badCount == 0){
    return(
      <p>
        No feedbacks given
      </p>
    )
  }
  
  return(
    <div>
      <StatisticLine text = 'good' value = {props.goodCount}/>
      <StatisticLine text = 'neutral' value = {props.neutralCount}/>
      <StatisticLine text = 'bad' value = {props.badCount}/>
      <StatisticLine text = 'all' value = {props.allCount.length}/>
      <StatisticLine text = 'average' value = {props.averageCount}/>
      <StatisticLine text = 'positive' value = {props.positiveCount} />
    </div>
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
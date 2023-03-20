import { useState, useRef, useEffect } from 'react'
import classes from './App.module.css'

const App = () => {
  const [count, setCount] = useState(parseInt(localStorage.getItem("count") as string))
  const [isTimerCounting, setIsTimerCounting] = useState(false)
  const counter = useRef(0);

  const startCount = () => {
    setIsTimerCounting(true)
    counter.current = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)
  }

  useEffect(() => {
    console.log(count)
    localStorage.setItem("count", count.toString()) 
  }, [count])

  useEffect(() => {
    return () => {
      stopCount()
    }
  }, [])

  const stopCount = () => {
    clearInterval(counter.current)
    setIsTimerCounting(false)
  }

  const resetCount = () => {
    stopCount()
    setCount(0)
  }

  return (
    <div className={classes.container}>
      <p>{count}</p>
      <div className={classes['button-container']}>
        {isTimerCounting ? <button onClick={stopCount}>Stop</button> : <button onClick={startCount}>Start</button>}
        <button onClick={resetCount}>Reset</button>
      </div>
    </div>
  )
}

export default App

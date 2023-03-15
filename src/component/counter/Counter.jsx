import React,{useState} from 'react'
import '../../App.css'
import { useDispatch,useSelector } from 'react-redux'
import { increment,decrement,reset,incrementbyamount ,decrementbyamount} from './counterSlice'


const Counter = () => {
  const [amount,setAmount] = useState(0)
  const addValue = Number(amount) || 0

    const dispatch = useDispatch()
    const count = useSelector((state)=>state.counter.count)

    const resetAll=()=>{
      setAmount(0)
      dispatch(reset())
    }

  return (
    <div className='counter'>
      {count}
      <input type="text" value={amount} onChange={e=>setAmount(e.target.value)} />
      <div style={{display: 'flex',
      gap:'1rem'}}>
        <button onClick={()=>dispatch(increment())} >+</button>
        <button onClick={()=>dispatch(decrement())} >-</button>
        <button onClick={resetAll} >reset</button>
        <button onClick={()=>dispatch(incrementbyamount(addValue))} >10+</button>
        <button onClick={()=>dispatch(decrementbyamount(addValue))} >5-</button>
      </div>
    </div>
  )
}

export default Counter

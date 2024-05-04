import React, { useState , useEffect } from 'react'
import styles from "./heading.module.css"


const Heading = () => {
  const [days,setDays] = useState(0)
  const [hours,setHours] = useState(0)
  const [min,setMins] = useState(0)
  const [sec,setsecs] = useState(0)
  const [timer,setTimer] = useState(false)
  const [moreDays,setMoreDays] = useState(false) 
  
  useEffect(()=>{
    let interval
    if (timer){
      interval = setInterval(()=>{
        if (sec > 0){
          setsecs((sec)=> sec - 1)
        }
        else if (min > 0){
          setMins((min)=> min - 1)
          setsecs(59)
        }
        else if (hours > 0){
          setHours((hour)=> hour - 1)
          setsecs(59)
          setMins(59)
        }
        else if (days > 0){
          setDays((day)=> day - 1)
          setHours(23)
          setsecs(59)
          setMins(59)
        }
      },1000)
    }
    return (()=>clearInterval(interval))
  },)

  return (
    <div className={styles.flexParent}>
      <form onChange={(e)=>{
      let date = new Date(e.target.value)
      const total = date - new Date()
      const currdays = Math.floor(total / (1000 * 60 * 60 * 24))
      const currhours = Math.floor(total / (1000 * 60 * 60) % 24)
      const currMin = Math.floor(total/ (1000*60) % 60)
      const currSec = Math.floor((total / 1000) % 60)
      
      if (currdays <100){
        setMoreDays(false)
        setDays(currdays)
        setHours(currhours)
        setMins(currMin)
        setsecs(currSec)
      }else{
        setMoreDays(true)
        setDays(0)
        setHours(0)
        setMins(0)
        setsecs(0)
      }
     }}>
      <div>
     <h1 className={styles.heading}><span className={styles.countDown}>Countdown</span> <span className={styles.time}>Timer</span></h1>
     
     <input type="date" className={styles.inputDate}/>
     <h5 type="submit" onClick={()=>setTimer(true)} className={styles.starBtn}>Start Timer</h5>
     
      </div>
    {moreDays === true ? <h2 className={styles.warning}>Selected days are more than 100</h2> :
    <div className={styles.flex}>
      <div className={styles.flexChild}><p>{days}</p><p>Days</p></div>
      <div className={styles.flexChild}><p>{hours}</p><p>Hours</p></div>
      <div className={styles.flexChild}><p>{min}</p><p>Minutes</p></div>
      <div className={styles.flexChild}><p>{sec}</p><p>Seconds</p></div>
    </div>}
    </form>
    </div>
  )
}

export default Heading
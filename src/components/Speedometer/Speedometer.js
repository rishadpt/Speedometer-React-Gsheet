import React, { useEffect, useState } from 'react'
import Papa from "papaparse";
import {FiRefreshCw} from 'react-icons/fi'
import './Speedometer.scss'

export default function Speedometer() {
    const [data, setData] = useState([]);
    const [index,setIndex] = useState(0)
    const [go,setGo] = useState(false);
  
  const refreshData = ()=>{
    setGo(false)
    document.querySelector(".needle").style.transform = `rotate(-118deg)`;
    document.querySelector(".needle").style.transition = `2s linear`;
  
    setIndex(index + 1)
    if(index === data.length || index > data.length){
      setIndex(0)
      console.log("index setteedd to ",index)
    }
  }

console.log(index,"length",data.length)
  const moveArrow = (time,speed) => {
    if (speed < 0 && time > 0) {
      return;
    }
    else if(speed > 260){
      speed = 260
    }
    else if (speed === 240){
      speed -= 15
    }
    else if (speed ===20){
      speed += 8
    }

    else if (speed === 40){
      speed += 10
    }
    
    else if (speed === 60){
      speed += 10
    }

    else if (speed === 160){
      speed -= 10
    }
    else if (speed > 160 && speed < 260){
      speed -= 18
    }
    
    document.querySelector(".needle").style.transform = `rotate(${(speed * (240 / 260 )) - 118}deg)`;
    document.querySelector(".needle").style.transition = `${time}s linear`;  
  }

  useEffect(() => {

    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0xXxLyXImJUfaosO197_qNr5ThonTO8ji8f5gpWj3JdLsb6t_NiuxqBxlsRHkTQxDqIdIDxsvM9Jc/pub?output=csv", {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
    
  }, [])
  return (
      <>
    <div className="speed_meter_main">
    <div style={{ backgroundImage: 'url("/images/guage.png")' }} className="guage">
      <div className="needle"> </div>
      {!go ? <div onClick={()=>{go ? setGo(false): setGo(true);moveArrow(data[index].time,data[index].speed)}} className="time go">GO</div> :
      <div className="time">{data[index] ? data[index].time+'s':(data.length === index) && 'END'}</div>}
    </div>   
    <div onClick={refreshData} className="refresh">
    <FiRefreshCw/>
      <p>REFRESH</p>
    </div> 
  </div>
    </> 
  )
}

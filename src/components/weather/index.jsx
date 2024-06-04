import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import {ReactComponent as Moon} from '../../assets/svgs/moonie.svg'
import {ReactComponent as Cloud} from '../../assets/svgs/cloudie.svg'
// import {ReactComponent as Pin} from '../../assets/svgs/pin.svg'


const WeatherWidget = ({location}) => {
  const [weatherData,setWeatherData]=useState(null);
  useEffect(
    ()=>{
      if(location.length){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=62406c3f41e9e5bc51a0bc27cbf6575a&units=metric`).then(
          response=>{
            setWeatherData(response.data)
          }
        ).catch(error=>{
          console.error("error :",error)
        })
      }
    },[location]
  )
  if(!weatherData)return <div>Loading ...</div>;
  const currentTime = new Date().getTime()/1000;
  const localTZ = currentTime+ weatherData.timezone;
  const isDay = localTZ >weatherData.sys.sunrise && localTZ < weatherData.sys.sunset;
  const cloudSize = weatherData.clouds.all;

  const gradientColors = isDay
  ? 'linear-gradient(to bottom, #87CEEB, #FFFFE0)'
  : 'linear-gradient(to bottom, #0e1c26, #2a454b)';
  const fontColor = isDay ? 'black' : 'wheat';


  
  return (
    <div className='weather-widget' style={{ background: gradientColors ,color:fontColor  }}>
      {isDay ?<div className='sun'></div>:<Moon className='moon'/> }
      {/* <Moon className='moon'/>
      <div className='sun'></div> */}
      <div className='cloud-container'>
        {cloudSize > 50 && <Cloud className='cloud'/>}
      </div>
      <div className='info'>
        <div className='temp'>{Math.round(weatherData.main.temp)}°</div>
        <div className='weather'>{weatherData.weather[0].main}</div>
        <div className='low-high'>{Math.round(weatherData.main.temp_min)}°/{Math.round(weatherData.main.temp_max)}°</div>
        <div className='feels-like'>Feels like: {Math.round(weatherData.main.feels_like)}°</div>
        <div className='location'>
          {/* <Pin className='location-pin'/> */}
          <div className='location-name'>{weatherData.name}</div>
        </div>
        
        <div className='humidity'>Humidity: {weatherData.main.humidity}</div>
      </div>
 
    </div>
  )
}

export default WeatherWidget

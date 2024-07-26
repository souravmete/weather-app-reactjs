import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";

import search from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";




export const Weather = () => {

    const inputRef =useRef()
    const [weatherData,setWeatherData] =useState(false);

    const allIcons ={
      "01d":clear,
      "01n":clear,
      "02d":cloud,
      "02n":cloud,
      "03d":cloud,
      "03n":cloud,
      "04d":drizzle,
      "04n":drizzle,
      "09d":rain,
      "09n":rain,
      "10d":rain,
      "10n":rain,
      "13d":snow,
      "13n":snow,
    }



    const api = async (city)=>{

      if(city === ""){
         alert("Enter city name");
         return;
      }
        try{
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const res = await fetch(url)
            const data = await res.json()

            console.log(data)

            const icon =allIcons[data.weather[0].icon]|| clear ;

            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temp:Math.floor(data.main.temp),
                location:data.name,
                icon:icon,
                
            })

        } catch(error) {
            console.log(error)
    }
}


    useEffect(()=>{
        api("delhi");
        
    },[])
  return (
    <>
      <div className="weather">
        <div className="search-bar">
          <input type="text" placeholder="Search"  ref={inputRef}/>
          <img src={search} alt="" onClick={()=>api(inputRef.current.value)}/>
        </div>

        {
          weatherData ? <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
        <p className="temperature">{weatherData.temp}°c</p>
        <p className="location">{weatherData.location}</p>


        <div className="weather-data">

          <div className="col">
            <img src={humidity} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={wind} alt="" />
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span></span>
            </div>
          </div>


        </div>
          </>:<>Api Fetch Error</>
        }
        
      </div>
    </>
  );
}

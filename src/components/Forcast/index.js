import React , {useState,useEffect, useCallback } from 'react'
import { formatToLocalTime } from '../../services/formatToLocalTime'
import { useParams } from 'react-router-dom';
import './index.css'

const Forecast = ({units}) => {
    const [forecastData, setForecastData] = useState(null);

    const API_KEY = '68030d106c5856eff051b45212cd9f28'
    const {city} = useParams()

    const formatForecastWeather = (secs,offset,data) => {
        const hourly  = data.filter((f) => f.dt > secs)
            .slice(0,5)
            .map((f) => ({
                temp:Math.round(f.main.temp),
                title:formatToLocalTime(f.dt,offset,'hh:mm a'),
                icon : f.weather[0].icon,
                description:f.weather[0].main,
                date:f.dt_txt}))
        
        const daily = data.filter((f) => f.dt_txt.slice(-8) === '12:00:00')
        .map((f) => ({
            temp:Math.round(f.main.temp),
            title:formatToLocalTime(f.dt,offset,'ccc'), 
            icon : f.weather[0].icon,
            description:f.weather[0].main,
            date:f.dt_txt}))
    
            return {hourly,daily}
    }
    let tempSymbol
    if(units === 'metric'){
        tempSymbol = '°C'
    }else if(units === 'imperial'){
        tempSymbol = '°F'
    }

    const getForecastData = useCallback(async () => {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`);
          const data = await response.json();
          const { hourly, daily } = formatForecastWeather(data.list[0].dt, data.city.timezone, data.list);
          console.log(data);
          console.log({ hourly, daily });
          setForecastData({ hourly, daily });
        } catch (error) {
          console.error('Error fetching Forecast data:', error);
        }
      }, [city, units]);
    
      useEffect(() => {
        if (city) {
          getForecastData();
        }
      }, [city, units, getForecastData]);


    
    return (
        <div>
            <section >
                <h2>Hourly Forecast</h2>
                <hr/>
                <div className='forecast'>
                    {forecastData?.hourly.map((f) => (
                        <div key = {f.title} className='forecastItem'>
                            <p>{f.title}</p>
                            <img src={`http://openweathermap.org/img/wn/${f.icon}@2x.png`} alt = 'weather icon' />
                            <p>{f.description}</p>
                            <p>{f.temp}{tempSymbol}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2>Daily Forecast</h2>
                <hr/>
                <div className='forecast'>
                    {forecastData?.daily.map((f) => (
                        <div key = {f.title}  className='forecastItem'>
                            <p>{f.title}</p>
                            <img src={`http://openweathermap.org/img/wn/${f.icon}@2x.png`} alt = 'weather icon' />
                            <p>{f.description}</p>
                            <p>{f.temp}{tempSymbol}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Forecast
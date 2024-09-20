import React , {useState,useEffect,useCallback} from 'react'
import { useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import TempAndDetails from '../TempAndDetails';
import DateTime from '../DateTime';
import Forecast from '../Forcast';
import {formatToLocalTime} from '../../services/formatToLocalTime'
import './index.css'

const WeatherPage = () => {
    const [units,setUnits] = useState('metric');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

   const API_KEY = '68030d106c5856eff051b45212cd9f28'
   const {city} = useParams()


   const getWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`);
      const data = await response.json();
      console.log(data);
      const currentWeather = formatCurrent(data);
      setWeatherData(currentWeather);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  }, [city, units]);
  const formatCurrent = (data) => {
    const {
        coord: {lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed},
        timezone
    } = data;

    const {main,icon} = weather[0]
    const formattedLocalTime = formatToLocalTime(dt, timezone);
    return{
        speed,
        dt,timezone,
        lat,lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise : formatToLocalTime(sunrise,timezone,'hh:mm a'),
        sunset : formatToLocalTime(sunset,timezone,'hh:mm a'),
        main,
        formattedLocalTime,
        icon:`http://openweathermap.org/img/wn/${icon}@2x.png`
    };
    }

    const  loader = () => {
        return(
            <Oval
                height={80}
                width={80}
                color="#e01635"
                visible={true}
                secondaryColor="#4fa94d"
                className="loader"
            />
        )
    }

    useEffect(() => {
        if (city) {
          getWeatherData();
        }
      }, [city, units, getWeatherData]);


  console.log('weatherData',weatherData)

return(
    <div className='weatherPage'>
            {loading ? (
                loader()
            ) : weatherData ? (
                <>
                <div>
                    <button className={units === 'metric' ? 'selected' : ''} onClick={() => setUnits('metric')}>°C</button>
                    /
                    <button className={units === 'imperial' ? 'selected' : ''}  onClick={() => setUnits('imperial')}>°F</button>
                </div>
                <DateTime weather={weatherData} />
                <TempAndDetails weather={weatherData} units={units} />
                <Forecast units = {units}/>
                </>
            ) : (
                <p>Weather data not available</p>
            )}
        </div>
   
)

}

export default WeatherPage
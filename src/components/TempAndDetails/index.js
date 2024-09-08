import { FaThermometerEmpty } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FiWind } from "react-icons/fi";
import { GiSunrise,GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp,MdKeyboardArrowDown } from "react-icons/md";

import './index.css'

const TempAndDetails = ({weather,units}) => {
    console.log('weatherDataTemp',weather)

    const {icon,temp,temp_max,temp_min,sunrise,sunset,humidity,feels_like,speed,main} = weather

    const additionalInfoVertical = [
        {
            id:1,
            Icon:FaThermometerEmpty,
            title:"Real Feel",
            value:`${feels_like.toFixed()}°`,
        },
        {
            id:2,
            Icon:FaDroplet,
            title:"Humidity",
            value:`${humidity.toFixed()}%`,
        },
        {
            id:3,
            Icon:FiWind,
            title:"Wind",
            value:`${speed.toFixed()} ${units === 'metric'? 'Km/h' : 'm/s'}`
        },
    ]

    const additionalInfoHorizontal = [
        {
            id:1,
            Icon:GiSunrise,
            title:"Sun rise",
            value:sunrise
        },
        {
            id:2,
            Icon:GiSunset,
            title:"Sun set",
            value:sunset
        },
        {
            id:3,
            Icon:MdKeyboardArrowUp,
            title:"High",
            value:`${temp_max.toFixed()}°`,
        },
        {
            id:4,
            Icon:MdKeyboardArrowDown,
            title:"Low",
            value:`${temp_min.toFixed()}°`,
        },
    ]

    return(
        <div>
            <div className = 'weather'>
                <p>{main}</p>
            </div>
            <div className="weatherDetails">
                <img src = {icon} alt= 'weather icon' className="waetherIcon" />
            
            <p className="temperature">
                {`${temp.toFixed()}`}°
            </p>
            <div className="additionalInfo">
                {additionalInfoVertical.map(({id,Icon,title,value}) => (
                   <div className="info" key = {id}>
                   <Icon className="infoIcon" />
                   <p>{title} : <span>{value}</span></p>
               </div>     
                ))
                }
            </div>
            </div>

            <div className="additionalInfoHorizontal">
                  {additionalInfoHorizontal.map(({id,Icon,title,value}) => (
                    <div key = {id} className="horizontalInfo">
                        <Icon className="infoIcon horizontalIcon"/>
                        <p className="info">
                           {` ${title}: `}<span>  {value}</span>
                        </p>
                    </div>
                  ))}
            </div>
        </div>
    )
}
export default TempAndDetails
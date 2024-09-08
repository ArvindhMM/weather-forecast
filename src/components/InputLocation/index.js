import { BiSearch} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import './index.css'
import { useState } from "react";

const InputLocation = () => { 
    
    const [city,setCity] = useState('')
    const navigate = useNavigate(); 
    const onSearchClick = () => { 
        if(city !== ''){
            navigate(`/weather/${city}`);
        }
    }

    return(
        <div className="InputComponentContainer">
        <div className='inputLocationContainer'>
            <input type='text' placeholder='search by city...' className='inputLocation' value = {city} onChange = {(event) => setCity(event.currentTarget.value)} />
            <BiSearch className = 'icons' onClick={onSearchClick}/>
        </div>
    </div>
    )
}

export default InputLocation
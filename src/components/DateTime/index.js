import './index.css'

const DateTime = ({weather : {formattedLocalTime
    ,name,country}}) => {
    return(
        <div>
            <div className='DateTimeContainer'>
                <p className='DateTime'>
                    {formattedLocalTime
                    }
                </p>
            </div>
            <div className='locationContainer'>
                <p className='location'>
                    {name}, {country}
                </p>
            </div>
        </div>
    )
}

export default DateTime
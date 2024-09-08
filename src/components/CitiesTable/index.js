import {useState,useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import InputLocation from '../InputLocation';
import {ThreeDots} from 'react-loader-spinner';

import './index.css'

const CitiesTable = () => {
    const [citiesData, setCitiesData] = useState([]);
    const [page,setPage] = useState(1);
    const [searchQuery,setSearchQuery] = useState('');
    const [hasMore,setHasMore] = useState(true);
    // const [error,setError] = useState(null);
    // const [filteredCitiesData,setFilteredCitiesData] = useState([]);

    const fetchCitiesData = async () => {
        let response
        try{
        response = await fetch (`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${page*50}`)
        const data = await response.json();
        setCitiesData(prevCitiesData => [...prevCitiesData, ...data.results]);
        console.log(data.results.length)
        console.log(data.results)
        console.log(data)
        setPage(page+1);
        }catch(error){
            console.log(error)
        }

    }
    useEffect(() => {
        fetchCitiesData();
    },[])

    useEffect(() => {
        setCitiesData([]); 
        setPage(1);        
        setHasMore(true);   
        fetchCitiesData();  
    }, [searchQuery]);     


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const  loader = () => {
        return(
            <ThreeDots 
                        height="50" 
                        width="50" 
                        radius="5"
                        color="#4fa94d" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                    />
        )
    }
        

    return (
        <div className='citiesTable'>
            <InputLocation />
            <InfiniteScroll dataLength={citiesData.length} next={fetchCitiesData} hasMore={hasMore} loader={loader()}>
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Country</th>
                            <th>TimeZone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citiesData.map((city,index) => (
                            <tr key = {index}>
                                <td><a href={`/weather/${city.name}`}>{city.name}</a></td>
                                <td>{city.cou_name_en}</td>
                                <td>{city.timezone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    )
}

export default CitiesTable
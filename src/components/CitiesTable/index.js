import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import InputLocation from '../InputLocation';
import { ThreeDots } from 'react-loader-spinner';

import './index.css';

const CitiesTable = () => {
    const [citiesData, setCitiesData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); 

    const fetchCitiesData = useCallback(async (page) => {
        try {
            const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${page * 50}`);
            const data = await response.json();
            if (data.results.length > 0) {
                setCitiesData(prevCitiesData => [...prevCitiesData, ...data.results]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchCitiesData(page);
    }, [page, fetchCitiesData]);

    const loadMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    const loader = () => (
        <ThreeDots 
            height="50" 
            width="50" 
            radius="5"
            color="#4fa94d" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
        />
    );

    return (
        <div className='citiesTable'>
            <InputLocation />
            <InfiniteScroll
                dataLength={citiesData.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={loader()}
            >
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Country</th>
                            <th>TimeZone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citiesData.map((city, index) => (
                            <tr key={index}>
                                <td><Link to={`/weather/${encodeURIComponent(city.name.toLowerCase())}`}>{city.name}</Link></td>
                                <td>{city.cou_name_en}</td>
                                <td>{city.timezone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    );
}

export default CitiesTable;

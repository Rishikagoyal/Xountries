import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flags.css';

const Flags = () => {
    const [flags, setFlags] = useState([]);
    const [country, setCountry] = useState('');
    const [filteredFlags, setFilteredFlags] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('https://restcountries.com/v3.1/all');
                setFlags(res.data);
                setFilteredFlags(res.data); // Initially, display all flags
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []); // Only run once when the component mounts

    useEffect(() => {
        const result = flags.filter(item =>
            item.name.common.toLowerCase().includes(country.toLowerCase())
        );
        setFilteredFlags(result);
    }, [country, flags]); // Run this effect whenever `country` or `flags` changes

    return (
        <>
            <input
                type="text"
                placeholder="Search for countries"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
            />

            <div className="card-container">
                {filteredFlags.length > 0 ? (
                    filteredFlags.map((item, index) => (
                        <div className="countryCard" key={index}>
                            <img src={item.flags.png} alt={item.name.common} />
                            <h5>{item.name.common}</h5>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default Flags;

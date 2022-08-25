import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [selectedRadio, setSelectedRadio] = useState("");
    const radios = ['Africa', 'Europe', "America", "Asia", "Oceania"];
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then((res) => setData(res.data))
    }, []);
    return (
        <div className="countries">
            <ul className="radio-container">
                <input type="range" min="1" max="250" defaultValue={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
                {
                    radios.map((continent, index) => (
                        <li key={index}>
                            <input type="radio" id={continent} onChange={(e) => { setSelectedRadio(e.target.id) }} name="continentRadio" checked={continent === selectedRadio} />
                            <label htmlFor={continent}>{continent}</label>
                        </li>

                    ))
                }
                {selectedRadio && <li>  <input type="radio" onChange={(e) => { setSelectedRadio("") }} /> <label htmlFor="">Annuler filtre</label> </li>}
            </ul>
            {/* <p>Nombre Pays :{selectedRadio.length}</p> */}
            <ul>
                {data
                    .filter((country) => country.continents[0].includes(selectedRadio))
                    .slice(0, rangeValue)
                    .map((country, index) => (<Card key={index} country={country} />))}
            </ul>
        </div>
    );
};

export default Countries;
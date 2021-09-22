import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faMap } from '@fortawesome/fontawesome-free-solid'
import "./search.css"
import { useState, useEffect} from 'react';

const Search = () => {

    const [datas, setDatas] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    var depart = null
    var arrive = null
    var test = []
    var link = "https://api.comparatrip.eu/cities/autocomplete/?q=A"

    useEffect(() => {
        fetch(link)
        .then(response => response.json())
        .then(json => setDatas(json))
    }, [])
    
    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);

        link = (value.length >= 1) && ("https://api.comparatrip.eu/cities/autocomplete/?q=" + value) || "https://api.comparatrip.eu/cities/autocomplete/?q=A"

        fetch(link)
        .then(response => response.json())
        .then(json => setDatas(json))
    }

    const ChangeDepart = (e) => {
        let value = e.target;
        console.log(value)
        depart = value
    }

    return (
        <>
        <div className="global">
            <FontAwesomeIcon icon={faMap} className="iconSize" />
            <div className="searchBar">
                <input type="text" name="searchBar" id="searchBar" placeholder="Gare ou Ville" onChange={handleSearchTerm}/>
            </div>
        </div>

        <div className="search_results">
            {datas
            .filter((val) => {
                return val.unique_name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
            })
            .map((val) => {
                return (
                    <div className="search_result" onClick={ChangeDepart} key={val.id}>{val.local_name}</div>
                );
            })};
        </div>
        </>
    );
}

export default Search;

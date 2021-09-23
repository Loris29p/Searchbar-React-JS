import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faMap } from '@fortawesome/fontawesome-free-solid'
import "./search.css"
import { useState, useEffect} from 'react';

const Search = () => {

    const [datas, setDatas] = useState([])
    const [popular, setPopular] = useState([])
    const [suggestion, setSuggestion] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    var depart = null
    var arrive = null
    var link = "https://api.comparatrip.eu/cities/autocomplete/?q=A"
    const linkPopular = "https://api.comparatrip.eu/cities/popular/5"
    var linkSuggestion = "https://api.comparatrip.eu/cities/popular/from/paris/5"

    useEffect(() => {
        fetch(link)
        .then(response => response.json())
        .then(json => setDatas(json))

        fetch(linkPopular)
        .then(response => response.json())
        .then(json => setPopular(json))

        fetch(linkSuggestion)
        .then(response => response.json())
        .then(json => setSuggestion(json))
    }, [])

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);

        link = (value.length >= 1) && ("https://api.comparatrip.eu/cities/autocomplete/?q=" + value) || "https://api.comparatrip.eu/cities/autocomplete/?q=A"
        fetch(link)
        .then(response => response.json())
        .then(json => setDatas(json))

        linkSuggestion = (value.length >= 1) && ("https://api.comparatrip.eu/cities/popular/from/" + value + "/5") || "https://api.comparatrip.eu/cities/popular/from/paris/5"
        fetch(linkSuggestion)
        .then(response => response.json())
        .then(json => setSuggestion(json))
    }

    const ChangeDepart = (e, data) => {
        let value = e.target.value;
        depart = value
    }

    const ChangeArrive = (e, data) => {
        let value = e.target.value;
        arrive = value
    }

    return (
        <>
        <div className="CenterSearch">
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
                        <button className="search_result" onClick={ChangeDepart} value={val.city_id} key={val.city_id}>{val.local_name}</button>
                    );
                })};
            </div>
        </div>

        <div className="BorderOptions">
            <div>
                <h2 className="NamePopular">Destination les plus visitées:</h2>
                <div className="Popular">
                    {popular
                    .map((val) => {
                        return (
                            <button className="popularResult" onClick={ChangeDepart} value={val.city_id} key={val.id}>{val.local_name}</button>
                        )
                    })}
                </div>
            </div>

            <div>
                <h2 className="NameSuggestion">Suggestions des arrivées:</h2>
                <div className="Suggestion">
                    {suggestion
                    .map((val) => {
                        return (
                            <button className="popularResult" onClick={ChangeArrive} value={val.city_id} key={val.id}>{val.local_name}</button>
                        )
                    })}
                </div>
            </div>

            <div className="Trajet">
                <p>Départ:{depart}</p>
                <p>Arrivé:</p>
            </div>
        </div>
        </>
    );
}

export default Search;

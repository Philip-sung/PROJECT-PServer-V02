import React from "react";
import { useState } from "react";
import "./index.css"
import image1 from "../../assets/img/SearchIcon.png"

function SearchBar () {

    const [search, setSearch] = useState('');

    return(
        <div className="SearchBarForm">
            <input className="SearchBar" placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} onKeyDown={(e) => {if(e.code === "Enter"){alert(search)}}}></input>
            <button className="Search" onClick={() =>{alert(search)}}><img className="SearchImg" src={image1} alt="SearchImg"></img> </button>
        </div>
    )
}

export { SearchBar };
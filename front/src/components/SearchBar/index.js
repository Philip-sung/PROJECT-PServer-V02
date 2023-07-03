//External Imports
import React from "react";
import { useState } from "react";

//Local Imports
import { TransitionObject } from "../TransitionObj";

//Static Imports
import "./index.css"
import image1 from "../../assets/img/SearchIcon.png"

function SearchBar (props) {

    const [search, setSearch] = useState('');
    const userFunction = props.function;

    return(
        <TransitionObject>
            <div className="SearchBarForm">
                <input className="SearchBar" placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById('SearchButton').click()}}}></input>
                <button id="SearchButton" className="Search" onClick={() =>{userFunction()}}><img className="SearchImg" src={image1} alt="SearchImg"></img> </button>
            </div>
        </TransitionObject>
    )
}

export { SearchBar };
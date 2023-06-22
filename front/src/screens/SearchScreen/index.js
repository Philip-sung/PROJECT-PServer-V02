import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar";
import "./index.css"
import postIcon from "../../assets/img/PostIcon_04.png"

function SearchScreen() {

    
    return (
        <div className="SearchScreen">
            <SearchBar />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Link to="post" ><img className="PostButton" alt="PostIcon" src={postIcon} /></Link>
        </div>
    )
}

export { SearchScreen }
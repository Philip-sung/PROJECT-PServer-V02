import React from "react"
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor"
import { Link } from "react-router-dom";
import "./index.css"
import backIcon from "../../assets/img/BackArrowIcon.png"
import postIcon from "../../assets/img/PostIcon_04.png"

function PostScreen (){


    const [mdText,SetMDTest] = useState("");
    
    return (
        <div className="PostScreen">
            <div className="Header">
                <Link to={"/"}><img className="Icon" src={backIcon} alt="Back"/></Link>
                <input className="Title" type="text" placeholder="Post Title"></input>
                <Link to={"/"}><img className="Icon" src={postIcon} alt="Post" /></Link>
            </div>
            <div className="Board" data-color-mode="dark">
                <MDEditor height={500} value={mdText} onChange={SetMDTest} />
            </div>
            {mdText}
        </div>
    )
}

export { PostScreen }
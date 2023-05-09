import React from "react";
import "./index.css";
import { CreditView } from '../Credit/index';
import { creditStoreObj } from '../../store/creditStore';
import { screenStoreObj } from '../../store/screenStore';
import image1 from "../../assets/img/SearchIcon.png"

function NavigationBar(props) {

  let clicked = false;

  return (
    <div className={props.className} >
      <CreditView store={creditStoreObj} />
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetNewScreen("Search")}} /*style={{marginLeft: clicked ? 15:-1000 }}*/><img src={image1} width="40px;"  /></button>
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetNewScreen("Reservation")}}><img src={image1} width="40px;" /></button>
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetNewScreen("OnGoing")}}><img src={image1} width="40px;" /></button>
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetNewScreen("Works")}}><img src={image1} width="40px;" /></button>
      <button className="NavigationButton" onClick={() => {screenStoreObj.Report()}}><img src={image1} width="40px;" /></button>
    </div>
  )
}

export { NavigationBar }
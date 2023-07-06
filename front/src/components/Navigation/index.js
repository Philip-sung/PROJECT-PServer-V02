import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserInfoView } from '../UserInfo/index';
import { userInfoStoreObj } from '../../store/userInfoStore';
import { screenStoreObj } from '../../store/screenStore';
import { DevReport } from "../../dev/devtools";
import searchIcon from "../../assets/img/SearchIcon.png"
import reservationIcon from "../../assets/img/ReservationIcon.png"
import ongoingIcon from "../../assets/img/OnGoingIcon.png"
import worksIcon from "../../assets/img/WorksIcon.png"
import devIcon from "../../assets/img/DevIcon.png"
import backIcon from "../../assets/img/BackArrowIcon.png"

function NavigationBar(props) {
  const navigate = useNavigate();

  return (
    <div className={props.className} >
      {userInfoStoreObj.getLoginState() === true? <button className="LoginButton" onClick={() => {LogOut(); navigate('/'); console.log('USER : LogOut')}}>LogOut</button> : <Link className="LoginButton" to="login" >Log In</Link>}
      <UserInfoView store={userInfoStoreObj} />
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetNewScreen("Search")}} /*style={{marginLeft: clicked ? 15:-1000 }}*/><img src={searchIcon} width="40px;" alt="SearchIcon" /></button>
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetNewScreen("Reservation")}}><img src={reservationIcon} width="40px;" alt="ReservationIcon" /></button>
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetNewScreen("OnGoing")}}><img src={ongoingIcon} width="40px;" alt="OnGoingIcon" /></button>
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetNewScreen("Works")}}><img src={worksIcon} width="40px;" alt="WorksIcon" /></button>
      <button className="NavigationButton" onClick={() => {screenStoreObj.GetPrevScreen()}}><img src={backIcon} width="40px;" alt="backIcon" /></button>
      <button className="NavigationButton" onClick={() => {DevReport()}}><img src={devIcon} width="40px;" alt="DevIcon" /></button>
    </div>
  )
}

function LogOut() {
  
  userInfoStoreObj.toggleLogOnState();
  userInfoStoreObj.setUserName('NONAME');
  userInfoStoreObj.setPrivilege('GUEST');
}

export { NavigationBar }

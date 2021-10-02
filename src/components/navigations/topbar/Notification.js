import NotificationDropDown from "./NotificationDropDown"
import './Notification.css'
import React, { useState, useEffect } from 'react';

function Notification({section, icon, dropDownList}){
    const [dropDownItems, setDropDownItems] = useState([]);
    let len = dropDownItems.filter(item=> item.readYn === false).length;
    let dropDowns = dropDownItems.map(item => (
            <NotificationDropDown item={item} key={item.notificationId}/>
    ));
    
    useEffect(()=>{
        if(dropDownList !== undefined){
            setDropDownItems(dropDownList);
        }   
    });
    
    return(
        <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className={`fas ${icon} fa-fw`}></i>
                <span className="badge badge-danger badge-counter">{len}+</span>
            </a>
            
            {/** 드롭다운 리스트 목록 */}
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                 aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">
                    {section}
                </h6>
                {dropDowns}
                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
            </div>
        </li>
    )
}

export default Notification
import React, {useState} from 'react'
import SidebarToggleTop from './SideBarToggleTop'
import SearchBar from './SearchBar'
import Notification from './Notification'
import UserInformation from './UserInformation'

function TopBar({toggle, setToggle}){
    return(
        <nav className="navbar navbar-expand navbar-light navbar-fixed-top  bg-white topbar mb-4 static-top shadow w-100" id="topNavbar">
            <SidebarToggleTop/>
            <SearchBar/>

            <ul className="navbar-nav ml-auto">
                <Notification section="Alerts Center" icon="fa-bell"/>
                <Notification section="Message Center" icon="fa-envelope"/>
                <div className="topbar-divider d-none d-sm-block"></div>
                <UserInformation/>
            </ul>
        </nav>
    )
}

export default TopBar
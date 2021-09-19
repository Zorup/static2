import React, {useState} from 'react'
import SidebarToggleTop from './SideBarToggleTop'
import SearchBar from './SearchBar'
import Notification from './Notification'

function TopBar(){
    return(
        <nav className="navbar navbar-expand navbar-light navbar-fixed-top  bg-white topbar mb-4 static-top shadow w-100" id="topNavbar">
            <SidebarToggleTop/>
            <SearchBar/>

            <ul className="navbar-nav ml-auto">
                <Notification section="Alerts Center" icon="fa-bell"/>
                <Notification section="Message Center" icon="fa-envelope"/>
            </ul>
        </nav>
    )
}

export default TopBar
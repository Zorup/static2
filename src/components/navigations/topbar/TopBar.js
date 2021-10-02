import React from 'react'
import SearchBar from './SearchBar'
import Notification from './Notification'
import UserInformation from './UserInformation'
import {connect} from 'react-redux';

function TopBar({toggle, setToggle, mentionList}){
    const controlParentToggle = () =>{
        setToggle(!toggle);
    };

    return(
        <nav className="navbar navbar-expand navbar-light navbar-fixed-top  bg-white topbar mb-4 static-top shadow w-100" id="topNavbar">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={controlParentToggle}>
                <i className="fa fa-bars"></i>
            </button>
            <SearchBar/>

            <ul className="navbar-nav ml-auto">
                <Notification section="Alerts Center" dropDownList={mentionList} icon="fa-bell"/>
                <Notification section="Message Center" icon="fa-envelope"/>
                <div className="topbar-divider d-none d-sm-block"></div>
                <UserInformation/>
            </ul>
        </nav>
    )
}

const mapStateToProps = state => ({
    mentionList: state.mentionDispatcher.mentionAlertList,
});

export default connect(
    mapStateToProps
)(TopBar)
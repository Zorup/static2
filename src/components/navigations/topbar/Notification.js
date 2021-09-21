import NotificationDropDown from "./NotificationDropDown"
import './Notification.css'
function Notification({section, icon}){
    return(
        <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className={`fas ${icon} fa-fw`}></i>
                <span className="badge badge-danger badge-counter">3+</span>
            </a>
            
            {/** 드롭다운 리스트 목록 */}
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                 aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">
                    {section}
                </h6>
                <NotificationDropDown/>
                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
            </div>
        </li>
    )
}

export default Notification
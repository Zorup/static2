function NotificationDropDown(){
    return(
        <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="mr-3">
                <div className="icon-circle bg-primary">
                    <i className="fas fa-file-alt text-white"></i>
                </div>
            </div>
            <div>
                <div className="small text-gray-500">December 12, 2019</div>
                <span className="font-weight-bold">A new monthly report is ready to download!</span>
            </div>
        </a>
    )
}

export default NotificationDropDown
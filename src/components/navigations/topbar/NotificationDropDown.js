function NotificationDropDown({item}){
    return(
        <a className="dropdown-item d-flex align-items-center" href="#">
            <div>
                <div className="small text-gray-500">
                    {item.createDate.month} {item.createDate.dayOfMonth}, {item.createDate.year}
                </div>
                <span className="font-weight-bold">{item.content}</span>
            </div>
        </a>
    )
}

export default NotificationDropDown
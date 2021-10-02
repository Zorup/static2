import React, { useCallback} from 'react';
import './Notification.css'
function NotificationDropDown({item}){
    console.log(item.readYn);
    const onClickHandler = useCallback((e)=>{
        // drop 다운 내부 클릭시 드롭다운 리스트가 자동으로 풀림 방지 
        e.stopPropagation();

        
        alert("click!");
    });
    return(
        <a className="dropdown-item d-flex align-items-center" href="#" onClick={onClickHandler}>
            <div>
                <div className="small text-gray-500">
                    {item.createDate.month} {item.createDate.dayOfMonth}, {item.createDate.year}
                </div>
                <span className="font-weight-bold">{item.content}  </span>
                { item.readYn ? null : <span className="badge badge-danger badge-counter"> new </span> }
            </div>
        </a>
    )
}

export default NotificationDropDown
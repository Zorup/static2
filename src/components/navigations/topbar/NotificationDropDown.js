import React, {useState, useCallback} from 'react';
import './Notification.css'
import axios from "axios";
import {connect} from 'react-redux';
import {setReadYnTrue} from '../../../module/mention'

function NotificationDropDown({item, clickRender}){
    const [readYn, setReadYn] = useState(item.readYn);
    const onClickHandler = useCallback(async (e)=>{
        // drop 다운 내부 클릭시 드롭다운 리스트가 자동으로 풀림 방지 
        e.stopPropagation();
        try{
            if(!readYn){
                await axios.patch(
                    `http://localhost:8081/fcm/v1/notification/${item.notificationId}`,
                    null,
                    { withCredentials: true }
                );
                clickRender(item.notificationId);
                setReadYn(true);
            }
        }catch(e){}
    });
    return(
        <a className="dropdown-item d-flex align-items-center" href="#" onClick={onClickHandler}>
            <div>
                <div className="small text-gray-500">
                    {item.createDate.month} {item.createDate.dayOfMonth}, {item.createDate.year}
                </div>
                <span className="font-weight-bold">{item.content}  </span>
                { readYn ? null : <span className="badge badge-danger badge-counter"> new </span> }
            </div>
        </a>
    )
}


const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
    clickRender: (data)=>{
        dispatch(setReadYnTrue(data));
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationDropDown)
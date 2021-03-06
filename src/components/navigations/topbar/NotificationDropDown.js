import React, {useState, useCallback} from 'react';
import './Notification.css'
import {connect} from 'react-redux';
import {setReadYnTrue} from '../../../module/mention'
import {patchMentionReadYn, getOnePost} from '../../../service/fetch'
import {parseView} from '../../../service/parse'

function NotificationDropDown({item, clickRender, setPosts}){
    const [readYn, setReadYn] = useState(item.readYn);
    const onClickHandler = useCallback(async (e)=>{
        // drop 다운 내부 클릭시 드롭다운 리스트가 자동으로 풀림 방지 
        e.stopPropagation();
        try{
            if(!readYn){
                await patchMentionReadYn(item.notificationId);
                clickRender(item.notificationId);
                setReadYn(true);
            }
            const response = await getOnePost(item.postId);
            let views = await parseView([response.data.data])
            setPosts(views)
        }catch(e){}
    });

    return(
        <a className="dropdown-item d-flex align-items-center" href='#nt' onClick={onClickHandler}>
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
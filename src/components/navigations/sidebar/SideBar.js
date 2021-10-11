import './SideBar.css'
import React, { useState, useEffect } from 'react';
import {CreatGroupModal, DeleteGroupModal} from './SideBarModal'
import axios from 'axios';
import {connect} from 'react-redux';
import ForumButton from './ForumButton';
import Chat from '../../chat/Chat';


function SideBar({toggle, setToggle, setForum, userList, loginUserInfo}){
    const [forumList, setForumList] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [initSocket, setInitSocket] = useState(false);
    const [showChatUI, setShowChatUI] = useState({
            isDisplay : false,
            userInfo : {},
            roomName : "",
            roomId : ""
        });
    
    const onClickDM = async (e)=>{
        /**  차후 확장성을 고려하여 배열로 받는다. */
        const roomUserIds = (e.target.dataset.rid).split('-')
                                                .map(item=>parseInt(item))
                                                .filter(item=> item !== loginUserInfo.userId)
                                                .sort();
                                          
        const targetUsers = [];
        roomUserIds.forEach(roomUserId => {
            targetUsers.push(userList.find(user=>user.userId === roomUserId));
        });

        setShowChatUI(
            {
                isDisplay: true,
                userInfo: targetUsers,
                roomName: e.target.text,
                roomId : e.target.dataset.rid
            }
        );
    }

    const controlParentToggle = () =>{
        setToggle(!toggle);
    };

    const dmUserList = chatRooms.map(room =>(
        <a className="custom-collapse-item abtn" 
            key={room.roomId} 
            data-rid={room.roomId}
            onClick={onClickDM}>{room.roomName}</a>
    ));

    useEffect(()=>{
        const fetchForumList = async()=>{
          try{
            const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/main/v1/forum`,
              { withCredentials: true }
            );
            setForumList(response.data.forumList);
          }catch(e){
          }
        };
        
        const fetchChatRooms = async()=>{
            try{
                const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/chat/${loginUserInfo.userId}/rooms`,
                { withCredentials: true }
                );
                setChatRooms(response.data);
            }catch(e){}
        };

        fetchForumList();
        fetchChatRooms();
    }, [])

    const forumButtons = forumList.map(item => (
        <ForumButton forum={item} key={item.forumId} setForum={setForum}/>
    ));

    return(
        <>
            {showChatUI.isDisplay ? <Chat showChatUI={showChatUI} setShowChatUI={setShowChatUI} initSocket={initSocket} setInitSocket={setInitSocket}></Chat> : null}
            <ul className={"navbar-nav bg-gradient-secondary sidebar sidebar-dark accordions" + (toggle ? ' toggled' : '')} id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">GroupWare <sup>1</sup></div>
                </a>
                <hr className="sidebar-divider my-0"></hr>
                <hr className="sidebar-divider"></hr>
                <div className="sidebar-heading">
                    소그룹
                </div>

                <li className="nav-item" >
                    <div className="forum-list">
                        {forumButtons}
                    </div>
                </li>

                <hr className="sidebar-divider"></hr>
                <div className="sidebar-heading">
                    소그릅 관리
                </div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="false" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>설정</span>
                    </a>
                    <div id="collapsePages" className="collapse"  data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded" >
                            <button className="custom-collapse-item abtn" data-toggle="modal" data-target="#subGroup">소그룹 추가</button>
                            <button className="custom-collapse-item abtn" data-toggle="modal" data-target="#deleteSmallGroup">소그룹 삭제</button>
                        </div>
                    </div>
                </li>
                {/** 사이드바 토글 */}
                <hr className="sidebar-divider d-none d-md-block"></hr>

                <div className="sidebar-heading">
                    다이렉트 메시지
                </div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#dm-target-user"
                    aria-expanded="false" aria-controls="dm-target-user">
                        <img className="dmIcon" src={process.env.PUBLIC_URL + "/send.png"}/>
                        {/**이미지 색상 다른 아이콘 색이랑 맞게 수정해서 넣기 */}
                        <span> 다이렉트 메시지</span>
                    </a>
                    <div id="dm-target-user" className="collapse" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded" >
                            {dmUserList}
                        </div>
                    </div>
                </li>

                {/** 사이드바 토글 */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={controlParentToggle}></button>
                </div>
            </ul>

            <CreatGroupModal forumList={forumList} setForumList={setForumList}/>
            <DeleteGroupModal forumList={forumList} setForumList={setForumList}/>
        </>
    )
}
const mapStateToProps = state => ({
    loginUserInfo: state.checkLogin.loginUserInfo,
  });
  
export default connect(
    mapStateToProps,
)(SideBar);
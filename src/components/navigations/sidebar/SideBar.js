import './SideBar.css'
import React, { useState, useEffect, useRef } from 'react';
import {CreatGroupModal, DeleteGroupModal} from './SideBarModal'
import {getForumList, getChatRooms, postChatRoom, getChatLogs} from '../../../service/fetch'
import {connect} from 'react-redux';
import ForumButton from './ForumButton';
import Chat from '../../chat/Chat';
import useStomp from "../../../hooks/useStomp"

function SideBar({toggle, setToggle, setForum, userList, loginUserInfo, isSelected, setIsSelected}){
    const $chatSearch = useRef();
    const [isAtSign, setAtSign] = useState(false); 
    const [forumList, setForumList] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [initSocket, setInitSocket] = useState(false);
    const [showChatUI, setShowChatUI] = useState({
            isDisplay : false,
            userInfo : {},
            roomName : "",
            roomId : "",
            chatLogs: [],
        });
    const [stomp] = useStomp()
    const [newMessage, setNewMessage] = useState(null);
    const [isSubScribe, setIsSubScribe] = useState(false);
    
    const onClickDM = async (e)=>{
        const targetUsers = getTargetUsers(e.target.dataset.rid);
        preDisPlayChatRoomHandler(e.target.dataset.rid, e.target.text, targetUsers);
    }

    const getTargetUsers = (roomId) => {
        const roomUserIds = (roomId).split('-')
                                    .map(item=>parseInt(item))
                                    .filter(item=> item !== loginUserInfo.userId)
                                    .sort();           
        const targetUsers = [];
        roomUserIds.forEach(roomUserId => {
            targetUsers.push(userList.find(user=>user.userId === roomUserId));
        });
        return targetUsers;
    }

    const preDisPlayChatRoomHandler = async (roomId, roomName, targetUsers) => {
        try{
            let currentChatLogs = [];
            const response = await getChatLogs(roomId);
            if(response.data !== ""){
                currentChatLogs = response.data;
            }
            setShowChatUI({
                isDisplay: true,
                userInfo: targetUsers,
                roomName: roomName,
                roomId : roomId,
                chatLogs : currentChatLogs
            });
        }catch(e){}
    };

    const onChatRoomSearchHandler = (e) =>{
        const currentInputValue = e.target.value;
        if(e.nativeEvent.inputType === "deleteContentBackward"){
            if(currentInputValue.indexOf('@') === -1){
                setAtSign(false);
            }
            if(currentInputValue.indexOf(isSelected.uname) === -1){
                setIsSelected({isSelected : false, uid : null, uname: null});
            }
        } 
        else {
            if(currentInputValue === ''){
                setAtSign(false);
                setIsSelected({isSelected : false, uid : null, uname: null});
                return;
            }
            if(!isSelected.isSelected){
                if( (e.nativeEvent.data === ' ')|| (!isAtSign && e.nativeEvent.data !== '@') || (isAtSign && e.nativeEvent.data === '@')){
                    e.target.value = currentInputValue.substr(0, currentInputValue.length-1);
                    return;
                }
            
                if(e.nativeEvent.data === '@'){
                    setAtSign(true);
                }
            } else{
                e.target.value = currentInputValue.substr(0, currentInputValue.length-1);
            }
        }
    }

    const addOpenRoom = async (data) =>{
        try{
            const response = await postChatRoom(data);
            const newState = [...chatRooms];
            newState.push(response.data);
            setChatRooms(newState);
        }catch(e){
        }
    }

    const createChatRoomButtonHandler = () => {
        if(isSelected.uid === null) return;
        const roomId = isSelected.uid > loginUserInfo.userId ? 
                    loginUserInfo.userId+'-'+isSelected.uid : isSelected.uid +'-'+ loginUserInfo.userId;
        const roomName = loginUserInfo.userId === isSelected.uid ? '나에게 보내기' : isSelected.uname.substring(1);
        const data = {
            userId : loginUserInfo.userId,
            roomId : roomId,
            roomName: roomName,
        }

        const preHaves = chatRooms.find((room) => {
            if(room.roomId === roomId) return true;
            return false;
        });

        if(preHaves === undefined){
            addOpenRoom(data);
        }
        const targetUsers = getTargetUsers(roomId);
        preDisPlayChatRoomHandler(roomId, roomName, targetUsers);
        $chatSearch.current.value = '';
        setAtSign(false);
        setIsSelected({isSelected : false, uid : null, uname: null});
    }

    const controlParentToggle = () =>{
        setToggle(!toggle);
    };

    const dmUserList = chatRooms.map(room =>(
        <a className="custom-collapse-item abtn text-center" 
            key={room.roomId} 
            data-rid={room.roomId}
            onClick={onClickDM}>{room.roomName}</a>
    ));

    useEffect(()=>{
        const fetchForumList = async()=>{
          try{
            const response = await getForumList();
            setForumList(response.data.forumList);
          }catch(e){
          }
        };
        
        const fetchChatRooms = async()=>{
            try{
                const response = await getChatRooms(loginUserInfo.userId);
                if(response.data !== ''){
                    setChatRooms(response.data);
                }else{
                    setChatRooms([]);
                }
            }catch(e){}
        };

        fetchForumList();
        fetchChatRooms();
    }, [])

    const forumButtons = forumList.map(item => (
        <ForumButton forum={item} key={item.forumId} setForum={setForum}/>
    ));

    return(
        <div id="sideBar">
            {showChatUI.isDisplay ? <Chat showChatUI={showChatUI} 
                                          setShowChatUI={setShowChatUI} 
                                          initSocket={initSocket} 
                                          setInitSocket={setInitSocket}
                                          stomp={stomp}
                                          newMessage={newMessage}
                                          setNewMessage={setNewMessage}
                                          isSubScribe={isSubScribe}
                                          setIsSubScribe={setIsSubScribe}>
                                    </Chat> : null}
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
                            <button className="custom-collapse-item abtn modalBtn" data-toggle="modal" data-target="#subGroup">소그룹 추가</button>
                            <button className="custom-collapse-item abtn modalBtn" data-toggle="modal" data-target="#deleteSmallGroup">소그룹 삭제</button>
                        </div>
                    </div>
                </li>
                {/** 사이드바 토글 */}
                <hr className="sidebar-divider d-none d-md-block"></hr>

                <div className="sidebar-heading">
                    {toggle ? <span> DM </span> : <span> 다이렉트 메시지 </span>}
                </div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#dm-target-user"
                    aria-expanded="false" aria-controls="dm-target-user">
                        <img className="dmIcon  mr-1" src={process.env.PUBLIC_URL + "/send.png"}/>
                        {/**이미지 색상 다른 아이콘 색이랑 맞게 수정해서 넣기 */}
                        {toggle ? <span> DM </span> : <span> 다이렉트 메시지 </span>}
                    </a>
                    <div id="dm-target-user" className="collapse" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded" >
                            <div className="dmSearch">
                                <input placeholder={"@채팅 유저 추가"}
                                       className={toggle ? "dmSearchToggle" : "dmSearchInput"}
                                       ref={$chatSearch}
                                       onChange={onChatRoomSearchHandler}/>
                                <button className={"dmSearchButton"}
                                        onClick={createChatRoomButtonHandler}>
                                    +
                                </button>
                            </div>
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
        </div>
    )
}
const mapStateToProps = state => ({
    loginUserInfo: state.checkLogin.loginUserInfo,
  });
  
export default connect(
    mapStateToProps,
)(SideBar);
import './SideBar.css'
import React, { useState, useEffect } from 'react';
import {CreatGroupModal, DeleteGroupModal} from './SideBarModal'
import axios from 'axios';
import ForumButton from './ForumButton';

function SideBar({toggle, setToggle, setForum}){
    const [forumList, setForumList] = useState([]);

    const controlParentToggle = () =>{
        setToggle(!toggle);
    };

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
        fetchForumList();
    }, [])

    const forumButtons = forumList.map(item => (
        <ForumButton forum={item} key={item.forumId} setForum={setForum}/>
    ));

    return(
        <div id="sideBar">
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
                    aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>설정</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded" >
                            <button className="custom-collapse-item abtn" data-toggle="modal" data-target="#subGroup">소그룹 추가</button>
                            <button className="custom-collapse-item abtn" data-toggle="modal" data-target="#deleteSmallGroup">소그룹 삭제</button>
                        </div>
                    </div>
                </li>

                {/** 사이드바 토글 */}
                <hr className="sidebar-divider d-none d-md-block"></hr>
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={controlParentToggle}></button>
                </div>
            </ul>

            <CreatGroupModal forumList={forumList} setForumList={setForumList}/>
            <DeleteGroupModal forumList={forumList} setForumList={setForumList}/>
        </div>
    )
}

export default SideBar
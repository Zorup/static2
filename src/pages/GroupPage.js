import TopBar from '../components/navigations/topbar/TopBar';
import SideBar from '../components/navigations/sidebar/SideBar';
import CreatePost from '../components/Post/CreatePost';
import Post from '../components/Post/Post';
import {UserInformation, DeepUserInfoSet} from '../module/mention'
import 'firebase/messaging'
import React, { useState, useEffect } from 'react';
import './groupPage.css'

import axios from 'axios';
import $ from 'jquery';
require('../libs/bootstrap-suggest-master/dist/bootstrap-suggest')

function GroupPage() {
    
    const [forumId, setForumId] = useState(1);
    const [posts, setPosts] = useState([]); 
    const [toggle, setToggle] = useState(false);
    const [groupId] = useState(1);
    const [userList, setUserList] = useState([]);
    const pushTargetUsers = {};

    const controlSideBar = (state) => {
      setToggle(state);
    };
    
    useEffect(()=>{
      $('.comment-input').suggest('@', {
        data: userList,
        map: function(user) {
          return {
            value: user.name,
            text: '<strong>'+user.name+'</strong> <small>'+user.loginId+'</small> <small hidden>'+user.userId+'</small>'
          }
        },

        onselect: function (e, item){
          const userInfoArr = item.text.split(" ");
          const currentPostId = e.$element.parent().data("id");
          const userId = Number.parseInt(userInfoArr[2]);
          
          if(!pushTargetUsers.hasOwnProperty(currentPostId)) {
            pushTargetUsers[currentPostId] = new DeepUserInfoSet();
          }
          if(!pushTargetUsers[currentPostId].has(userId)) {
            pushTargetUsers[currentPostId].add(new UserInformation(userId, userInfoArr[0]));
          }
        }
      });
    });

    useEffect(()=>{
      const fetchUserLists = async()=>{
      try{
          const response = await axios.get(
            'http://localhost:8081/main/v1/group/users',
            {withCredentials: true}
          );
          setUserList(response.data.list);
        }catch(e){
        }
      }
      fetchUserLists();
    }, [])

    useEffect(()=>{
      const fetchPosts = async()=>{
        try{
          const response = await axios.get(
            `http://localhost:8081/main/v1/forum/${forumId}/postview`,
            { withCredentials: true }
          );
          setPosts(response.data.list);
        }catch(e){
        }
      };
      fetchPosts();
    }, [forumId])

    const postList = posts.map(item =>(
        <Post post={item} key={item.postId} pushTargetUsers={pushTargetUsers}/>
    ));

    return (
      <div id="wrapper">
        <SideBar toggle={toggle} setToggle={controlSideBar} setForum={setForumId}/>
  
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
              <TopBar toggle={toggle} setToggle={controlSideBar}/>
              <div className="container-fluid" id="mainFeed">
                <CreatePost forumId={forumId} groupId={groupId} posts={posts} setPosts={setPosts}/>
                <hr></hr>
                <div className="container">
                  <div className="d-flex row">
                    <div className="col-md-7">
                      <div className="d-flex flex-column comment-section">
                        {postList}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <footer className="sticky-footer bg-white">
                  <div className="container my-auto">
                      <div className="copyright text-center my-auto">
                          <span>Copyright &copy; 2021 HONIK JP GroupWare</span>
                      </div>
                  </div>
          </footer>
        </div>
      </div>
    );
  }

export default GroupPage
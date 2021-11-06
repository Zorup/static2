import TopBar from '../components/navigations/topbar/TopBar';
import SideBar from '../components/navigations/sidebar/SideBar';
import CreatePost from '../components/Post/CreatePost';
import Post from '../components/Post/Post';
import {UserInformation, DeepUserInfoSet} from '../module/mention'
import 'firebase/messaging'
import React, { useState, useEffect } from 'react';
import './groupPage.css'

import {reIssuedTokenApi, getUserListApi, getPostView} from '../service/fetch'
import {parseView} from '../service/parse'
import {connect} from 'react-redux';

import $ from 'jquery';
require('../libs/bootstrap-suggest-master/dist/bootstrap-suggest')

function GroupPage({loginUserInfo}) {
    const [forumId, setForumId] = useState(1);
    const [posts, setPosts] = useState([]); 
    const [toggle, setToggle] = useState(false);
    const [groupId] = useState(1);
    const [userList, setUserList] = useState([]);
    const [isSelected, setIsSelected] = useState({isSelected : false, uid : null, uname: null});

    const pushTargetUsers = {};

    const controlSideBar = (state) => {
      setToggle(state);
    };

    const movePageTop = ()=>{
      window.scrollTo({top:0, behavior: 'smooth'});
    };

    if(window.location.hash !== undefined && window.location.hash.length > 5){
      const newId = parseInt(window.location.hash.split('/')[1]);
      if(!isNaN(newId) && (newId !== forumId)){
        window.location.hash = `forum/${newId}`;
        setForumId(newId);
      }
    }

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

      $('.dmSearchInput').suggest('@', {
        data: userList,
        map: function(user) {
          return {
            value: user.name,
            text: '<strong>'+user.name+'</strong> <small>'+user.loginId+'</small> <small hidden>'+user.userId+'</small>'
          }
        },

        onselect: function (e, item){
          const userInfoArr = item.text.split(" ");
          const userId = Number.parseInt(userInfoArr[2]);
          setIsSelected({isSelected : true, uid : userId, uname: '@'+userInfoArr[0]});
        }
      });
    });

    useEffect(()=>{
      const fetchUserLists = async()=>{
      try{
          const response = await getUserListApi();
          setUserList(response.data.list);
        }catch(e){
        }
      }
      fetchUserLists();
    }, [])

    useEffect(()=>{
      const fetchPosts = async()=>{
        try{
          const response = await getPostView(forumId);
          let views = await parseView(response.data.list)
          setPosts(views);
        }catch(e){
          if(e.response.data === 'Expired'){
            const isSuccess = await reIssuedTokenApi(loginUserInfo.refreshToken);
            console.log(isSuccess)
          }
        }
      };
      fetchPosts();
    }, [forumId])

    const postList = posts.map(item =>(
        <Post post={item} key={item.postId} pushTargetUsers={pushTargetUsers}/>
    ));

    return (
      <div id="wrapper">
          <SideBar toggle={toggle} 
                  setToggle={controlSideBar} 
                  setForum={setForumId}
                  userList={userList}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}/>
  
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

            <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; 2021 HONIK JP GroupWare</span>
                        </div>
                    </div>
            </footer>
          </div>
        </div>
        
        
        <button className="scroll-to-top rounded" onClick={movePageTop}>
          <i className="fas fa-angle-up"></i>
        </button>
        
      </div>
    );
  }

const mapStateToProps = state => ({
    loginUserInfo: state.checkLogin.loginUserInfo,
});

export default connect(
  mapStateToProps,
)(GroupPage);
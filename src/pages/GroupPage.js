import TopBar from '../components/navigations/topbar/TopBar';
import SideBar from '../components/navigations/sidebar/SideBar';
import CreatePost from '../components/Post/CreatePost';
import Post from '../components/Post/Post';
import {UserInformation, DeepUserInfoSet} from '../module/mention'
import 'firebase/messaging'
import React, { useState, useEffect, useRef } from 'react';
import './groupPage.css'

import {reIssuedTokenApi, getUserListApi, getPostView} from '../service/fetch'
import {parseView} from '../service/parse'
import {connect} from 'react-redux';

import {logOut} from '../module/login'
import {clearMentionList} from '../module/mention'

import $ from 'jquery';
require('../libs/bootstrap-suggest-master/dist/bootstrap-suggest')

function GroupPage({loginUserInfo, clearMentionList, clearUserInfo}) {
  const onClickLogOut = () =>{
        clearMentionList();
        clearUserInfo();
};

  const isValidAccessToken = async()=>{
    try{
      await getPostView(1);
    }catch(e){
      if(e.response.data === 'Expired'){
        const isSuccess = await reIssuedTokenApi(loginUserInfo.refreshToken);
        console.log(isSuccess)
        if (isSuccess) {
          window.location.reload()
        } else {
          onClickLogOut()
        }
      }
    }
  };
  isValidAccessToken();

    const [forumId, setForumId] = useState(1);
    const [posts, setPosts] = useState([]); 
    const [toggle, setToggle] = useState(false);
    const [groupId] = useState(1);
    const [userList, setUserList] = useState([]);
    const [isSelected, setIsSelected] = useState({isSelected : false, uid : null, uname: null});
    const showMoreElement = useRef();
    const pushTargetUsers = {};
    const controlSideBar = (state) => {
      setToggle(state);
    }; 

    const showButtonHandler = async() => {
        if (posts.length === 0) return;
        const oldestId = posts[posts.length-1].postId;

        const response = await getPostView(forumId, oldestId);
        let views = await parseView(response.data.list)
        let newPosts = [...posts];

        for (let i=0; i<views.length; i++) {
            newPosts.push(views[i]);
        }
        setPosts(newPosts);
    }
    const movePageTop = ()=>{
      window.scrollTo({top:0, behavior: 'smooth'});
    };

    if(window.location.hash !== undefined && window.location.hash.length > 5){
      const splitHash = window.location.hash.split('/')
      const newId = parseInt(splitHash[1]);
      
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
        }
      };
      fetchPosts();
    }, [forumId])

    const postList = posts.map(item =>(
        <Post post={item} key={item.postId} pushTargetUsers={pushTargetUsers} posts={posts} setPosts={setPosts}/>
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
              <TopBar toggle={toggle} setToggle={controlSideBar} setPosts={setPosts}/>
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
            
            <button className="showMore"
                    onClick={showButtonHandler}
                    ref={showMoreElement}>Show More ?</button>

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


const mapDispatchToProps = dispatch => ({
  clearUserInfo: ()=>{
      dispatch(logOut());
  },
  clearMentionList: ()=>{
      dispatch(clearMentionList());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupPage);

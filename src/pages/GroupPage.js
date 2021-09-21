import TopBar from '../components/navigations/topbar/TopBar';
import SideBar from '../components/navigations/sidebar/SideBar';
import CreatePost from '../components/Post/CreatePost';
import Post from '../components/Post/Post';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function GroupPage() {
    const [posts, setPosts] = useState([]); 
    const [toggle, setToggle] = useState(false);
    
    useEffect(()=>{
      const fetchPosts = async()=>{
        try{
          const response = await axios.get(
            'http://localhost:8081/main/v1/forum/1/postview'
          );
          setPosts(response.data.list);
        }catch(e){
        }
      };
      fetchPosts();
    },[])
  
    const postList = posts.map(item =>(
        <Post post={item} key={item.postId}/>
    ));

    return (
      <div id="wrapper">
        <SideBar toggle={toggle} setToggle={setToggle}/>
  
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
              <TopBar toggle={toggle} setToggle={setToggle}/>
              <div className="container-fluid">
                <CreatePost/>
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
import './CreatePost.css'
import {connect} from 'react-redux';
import axios from 'axios';
import {useState, useCallback} from "react"


function CreatePost({forumId, groupId, loginUserInfo, posts, setPosts}){
    const [content, setContent] = useState("");
    const onChangeContent = useCallback (e=>setContent(e.target.value), []);

    const creatPost = async()=>{
        try{
            const response = await axios.post(
                'http://localhost:8081/main/v1/post',
                {
                    "forumId" : forumId,
                    "groupId" : groupId,
                    "content" : content
                },
                {
                    withCredentials: true
                }
            );
            setContent("");
            const newPosts = [...posts];
            newPosts.splice(0,0,response.data.data);
            setPosts(newPosts);
        }catch(e){
        }
    }

    return(
    <div className="container">
        <div className="d-flex  row">
            <div className="col-md-7">
                <div className="d-flex flex-column comment-section">
                    <div className="bg-white p-2">
                        <div className="d-flex flex-row user-info">
                            <img className="rounded-circle" src="/img/undraw_profile.svg" width="30" height="30"></img>
                            <div className="d-flex flex-column justify-content-start ml-2">
                                <span className="d-block font-weight-bold name login-user-name"> {loginUserInfo.name}</span>
                            </div>
                        </div>
                        
                        <form id="post-write-form" className="mt-10">
                            <div className="d-flex flex-row align-items-start">
                                <textarea name ='content' 
                                          className="form-control ml-1 shadow-none textarea"
                                          value={content}
                                          placeholder="게시글 내용을 입력하세요."
                                          onChange={onChangeContent}></textarea>
                            </div>
                            <div className="mt-2 text-right">
                                <input id="post-write-submit" 
                                       className="btn btn-primary btn-sm shadow-none" 
                                       type='button' 
                                       value="submit" 
                                       onClick={creatPost}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


const mapStateToProps = state => ({
    loginUserInfo: state.checkLogin.loginUserInfo
});

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
import './CreatePost.css'
import {connect} from 'react-redux';
import {useState, useMemo, useRef} from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {postPost} from "../../service/fetch"
import {parseContents, parseView} from "../../service/parse"

function CreatePost({forumId, groupId, loginUserInfo, posts, setPosts}){
    const [content, setContent] = useState("");
    const quillRef = useRef();
    const onChangeContent = (value) => {
        setContent(value);
    }

    const creatPost = async()=>{
        try{
            let formData = await parseContents(content)
            formData.append('forumId', forumId)
            formData.append('groupId', groupId)
            const response = await postPost(formData);
            setContent("");

            const newPosts = [...posts];
            let newData = await parseView([response.data.data])
            newPosts.splice(0, 0, ...newData);
            setPosts(newPosts);
        }catch(e){
        }
    }

    const modules = useMemo(() => { // usememo 사용, imagehandler 추가
        return {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              ['image'],
            ],
          },
        };
      }, []);

      const formats = [     // format
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'image',
      ];

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
                            <div>
                                <ReactQuill name ='content' 
                                            className="ml-1 shadow-none"
                                            ref={quillRef}
                                            value={content}
                                            modules={modules}
                                            formats={formats}
                                            placeholder="게시글 내용을 입력하세요."
                                            onChange={onChangeContent} />
                            </div>
                        </form>
                        <div className="mt-2 text-right">
                                <input id="post-write-submit" 
                                       className="btn btn-primary btn-sm shadow-none" 
                                       type='button' 
                                       value="submit" 
                                       onClick={creatPost}/>
                            </div>
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
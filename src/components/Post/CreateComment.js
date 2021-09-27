import './CreatePost.css'
import axios from 'axios';
import {useState, useCallback} from "react"

function CreateComment({postId, comments, setComments}){
    const [content, setContent] = useState("");
    const onChangeContent = useCallback (e=>setContent(e.target.value), []);

    const clickLikeHandler = async()=>{
        const params = new URLSearchParams();
        params.append('postId', postId);
        params.append('content', content);
    
        try{
            const response = await axios.post(
                `http://localhost:8081/main/v1/comment`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true
                }
            );
            setContent("");
            const newComments = [...comments];
            newComments.push(response.data.data);
            setComments(newComments);
        }catch(e){
        }
    }

    return(
        <div className="p-2 InputComment">
            <form className="comment-write-form">
                <div className="d-flex flex-row align-items-start">
                    <img className="rounded-circle" src="img/undraw_profile.svg" width="40"></img>
                    <textarea name ='content' 
                              className="form-control ml-1 shadow-none textarea comment-input" 
                              placeholder="덧글을 입력하세요."
                              value={content}
                              onChange={onChangeContent}></textarea>
                </div>
                <div className="mt-2 text-right">
                    <button className="btn btn-primary btn-sm shadow-none" 
                             type="button"
                             onClick={clickLikeHandler}>Post</button>
                    <button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateComment
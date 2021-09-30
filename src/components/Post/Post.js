import CreateComment from "./CreateComment";
import Comment from "./Comment";
import axios from 'axios';
import {useState} from "react"

function Post({post, pushTargetUsers}){
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);

    const commentList = comments.map(item => (
        <Comment comment={item} key={item.commentId}/>
    ));
    
    const clickLikeHandler = async()=>{
        try{
            const response = await axios.post(
                `http://localhost:8081/main/v1/like?postId=${post.postId}`,
                null,
                {
                    withCredentials: true
                }
            );
            setLikes(response.data.data)
        }catch(e){
        }
    }

    return(
        <>
            <div className="bg-white p-2">
                <div className="d-flex flex-row user-info">
                    <img className="rounded-circle" src="img/undraw_profile.svg" width="60" height="60"/>
                    <div className="d-flex flex-column justify-content-start ml-2">
                        <span className="d-block font-weight-bold name"> {post.userName} </span>
                        <span className="date text-black-50">{post.createdDate} </span>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="comment-text">{post.content}</p>
                </div>

                <div className="bg-white">
                    <div className="d-flex flex-row fs-12">
                        <a className="p-2 like-button">
                            <i className="fa fa-thumbs-up"></i>
                            <span className="testLike">{likes}</span>
                            <span className="ml-1" onClick={clickLikeHandler}>Like</span>
                        </a>
                        <a className="p-2 ">
                            <i className="fa fa-comment"></i>
                            <span>{comments.length}</span>
                            <span className="ml-1">Comment</span>
                        </a>
                    </div>
                </div>
            </div>
            {commentList}
            <CreateComment postId={post.postId} comments={comments} setComments={setComments} pushTargetUsers={pushTargetUsers}/>
        </>
    )
}

export default Post
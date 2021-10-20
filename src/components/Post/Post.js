import CreateComment from "./CreateComment";
import Comment from "./Comment";
import {useState} from "react"
import './post.css'

import {postPostLikes} from "../../service/fetch"

function Post({post, pushTargetUsers}){
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [isOpen, setMenu] = useState(false);

    const commentList = comments.map(item => (
        <Comment comment={item} key={item.commentId}/>
    ));
        
    const toggleComment = () => {
        console.log('good');
        setMenu(isOpen => !isOpen); // on,off 개념 boolean
    }

    const clickLikeHandler = async()=>{
        try{
            const response = await postPostLikes(post.postId);
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
                    <p className="comment-text border border-2 rounded">
                    <div dangerouslySetInnerHTML={ { __html: post.content } }>
                        {/* html로 받아오기 위해서 */}

                    </div>
                </div>

                <div className="bg-white">
                    <div className="d-flex flex-row fs-12">
                        <a className="p-2 like-button" onClick={clickLikeHandler}>
                            <i className="fa fa-thumbs-up"></i>
                            <span className="testLike">{likes}</span>
                            <span className="ml-1">Like</span>
                        </a>
                        <a className={isOpen ? "colorPurple p-2 target" : "p-2 target colorBlue"}  onClick={toggleComment}>
                            <i className="fa fa-comment"></i>
                            <span>{comments.length}</span>
                            <span className="ml-1" >Comment </span>
                            {isOpen ? <span>숨기기</span> : <span>보기</span>}
                        </a>
                    </div>
                </div>
            </div>
            <div className={isOpen ? "show-menu" : "hide-menu"}>
            {commentList}
            </div>
            <CreateComment postId={post.postId} comments={comments} setComments={setComments} pushTargetUsers={pushTargetUsers}/>
        </>
    )
}

export default Post
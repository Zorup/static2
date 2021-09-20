import CreateComment from "./CreateComment";
import Comment from "./Comment";


function Post({posts}){

    const postList = posts.map(post=>
    
    <>
        <div className="bg-white p-2">
            <div className="d-flex flex-row user-info">
                <img className="rounded-circle" src="img/undraw_profile.svg" width="60" height="60"></img>
                <div className="d-flex flex-column justify-content-start ml-2">
                    <span className="d-block font-weight-bold name"> {post.userName} </span>
                    <span className="date text-black-50">{post.createdDate} </span>
                </div>
            </div>
            <div className="mt-2">
                <p className="comment-text">{post.content}</p>
            </div>
        </div>
        <Comment comments={post.comments}/>
        <CreateComment/>
    </>
    );

    return postList;

}

export default Post
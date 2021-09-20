import './Comment.css'

function Comment({comments}){

    const commentList = comments.map(comment=>
    <>
        <div className="comment">
            <div className="media">
                <div className="media-left">
                    <a href="#">
                        <img className="rounded-circle photo-profile" src="/img/undraw_profile.svg" width="32" height="32" alt="..."></img>
                    </a>
                </div>
                <div className="p-2 media-body" >
                    <span className="d-block font-weight-bold name" >
                        <span>{comment.userName}</span>
                        <a href="#" className="anchor-time">{comment.createdDate}</a>
                    </span>
                    <div>
                        <span>{comment.content}</span>
                    </div>
                </div>
            </div>
    </div>
    </>
    );

    return commentList;
}

export default Comment
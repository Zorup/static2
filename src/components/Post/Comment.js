import './Comment.css'

function Comment({comment}){
    return (
    <>
        <div className="comment border border-light rounded">
            <div className="media">
                <div className="media-left">
                    <a href="#">
                        <img className="rounded-circle photo-profile" src="/img/undraw_profile.svg" width="32" height="32" alt="..."></img>
                    </a>
                </div>
                <div className="p-2 media-body" >
                    <span className="d-block font-weight-bold name" >
                        <span className="mr-1">{comment.userName}</span>
                        <a href="#" className="anchor-time">{comment.createdDate}</a>
                    </span>
                    <div>
                        <span>{comment.content}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Comment
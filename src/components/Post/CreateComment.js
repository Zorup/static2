import './CreatePost.css'

function CreateComment(){
    return(
        <div className="p-2 InputComment">
            <form className="comment-write-form">
                <div className="d-flex flex-row align-items-start">
                    <img className="rounded-circle" src="img/undraw_profile.svg" width="40"></img>
                    <input className="current-post-id hideElement" name='postId' value="{{postId}}"></input>
                    <input className="current-forum-id hideElement" name='forumId'></input>
                    <textarea name ='content' className="form-control ml-1 shadow-none textarea comment-input" placeholder="덧글을 입력하세요."></textarea>
                </div>
                <div className="mt-2 text-right">
                    <input className="comment-write-submit btn btn-primary btn-sm shadow-none" type='button' value='Post comment'/>
                    <button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateComment
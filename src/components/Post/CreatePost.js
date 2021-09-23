import './CreatePost.css'
import {connect} from 'react-redux';

function CreatePost({forumId, groupId, loginUserInfo}){
    
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
                                <textarea name ='content' className="form-control ml-1 shadow-none textarea" placeholder="게시글 내용을 입력하세요."></textarea>
                            </div>
                            <div className="mt-2 text-right">
                                <input id="post-write-submit" className="btn btn-primary btn-sm shadow-none" type='button' value="submit" />
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
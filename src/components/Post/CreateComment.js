import './CreatePost.css'
import {useRef} from "react"
import {getNotiRequestData, UserInformation} from "../../module/mention"
import {connect} from 'react-redux';
import {postComment, postPushMessage} from "../../service/fetch"

function CreateComment({postId, comments, setComments, pushTargetUsers, sender}){
    const textAreaRef = useRef();
    const clickLikeHandler = async()=>{
        const params = new URLSearchParams();
        params.append('postId', postId);
        params.append('content', textAreaRef.current.value);
        try{
            console.log(pushTargetUsers);
            const response = await postComment(params);
            textAreaRef.current.value="";
            const newComments = [...comments];
            newComments.push(response.data.data);
            setComments(newComments);
            
            //멘션이 존재하는 경우 푸쉬 알람을 보내는 로직
            if(pushTargetUsers.hasOwnProperty(postId)){
                console.log("push message!");
                let pushRequestData = getNotiRequestData(new UserInformation(sender.userId, sender.name), 
                                                        pushTargetUsers, postId, true, postId);
                
                await postPushMessage(pushRequestData);
                delete pushTargetUsers[postId];
            }
        }catch(e){
        }
    }

    return(
        <div className="bg-white mb-3 p-2 InputComment border-top">
            <form className="comment-write-form">
                <div className="d-flex flex-row align-items-start" data-id={postId}>
                    <img className="rounded-circle" src="img/undraw_profile.svg" width="40"></img>
                    <textarea ref={textAreaRef}
                              name ='content' 
                              className="form-control ml-1 shadow-none textarea comment-input" 
                              placeholder="덧글을 입력하세요."></textarea>
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

const mapStateToProps = state => ({
    sender: state.checkLogin.loginUserInfo
});

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateComment)
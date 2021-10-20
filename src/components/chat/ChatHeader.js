import "./chat.css"
export default function ChatHeader({showChatUI, setShowChatUI, setInitSocket}){
    const onClickHandler = ()=>{
        setShowChatUI({
            isDisplay : false,
            userInfo : {},
            roomName : "",
            roomId :"",
            chatLogs: [],
        });
        setInitSocket(false);
    }

    return (
        <div className="chatbox-top">
            <div className="chatbox-avatar">
                <img src="https://gravatar.com/avatar/2449e413ade8b0c72d0a15d153febdeb?s=512&d=https://codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png" />
            </div>
            <div className="chat-partner-name">
                <span className="status online"></span>
                {showChatUI.roomName}
            </div>
            <div className="chatbox-icons">
                <a onClick={onClickHandler}><i className="fa fa-close"></i></a>       
            </div>      
        </div>
    )
}
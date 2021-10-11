import "./chat.css"
import { Rnd } from "react-rnd"
import ChatHeader from "./ChatHeader"
import {MyMessage, OtherMessage} from "./CharMessage"
import {connect} from 'react-redux';
import { useState, useEffect } from "react";
import axios from "axios";
var Stomp = require('stompjs');

function Chat({showChatUI, setShowChatUI, loginUserInfo, initSocket, setInitSocket}){
    const [chatLogs, setChatLogs]= useState([]);
    const [messageInput, setMessageInput] = useState("");
    const inputHandler = (e) =>{
        setMessageInput(e.target.value);
    }
    const sendMessageHandler = ()=>{
        const postChatLog = async()=>{
            try{
                /**
                 * 채팅과 관련해서 chat-log 컨트롤러로 보내지말고 
                 * ChatController로 보내면 한번에 처리.?
                 * 
                 */
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/chat/chat-log`,
                    {
                        roomId: showChatUI.roomId,
                        sender: loginUserInfo.userId,
                        message: messageInput
                    },
                    {
                        withCredentials: true
                    }
                );
                setMessageInput("");
                const newChatLogs = [...chatLogs];
                newChatLogs.push(response.data);
                setChatLogs(newChatLogs);
            }catch(e){}
        }
        postChatLog();
    }
    let socket;
    let client;

    useEffect(()=>{
        /** 소켓 init 하는 부분과 시점에 대해서 좀더 생각해봐야함. */
        if(!initSocket){
        socket = new WebSocket(`${process.env.REACT_APP_SOCK_URL}/chat/chat-conn`);
        client = Stomp.over(socket);
        client.debug = function (e) {
            console.log(e);
        };
        client.connect({}, function(){
            client.subscribe(`/topic/${loginUserInfo.userId}`, function(m){
                console.log(JSON.parse(m.body));
            });
        });
        setInitSocket(true);
        }
    },[])

    useEffect(()=>{
        const getChatLogs = async()=>{
            try{
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/chat/${showChatUI.roomId}/chat-logs`,
                    { withCredentials: true }
                );
                if(response.data !== ""){
                    setChatLogs(response.data);
                }else{
                    setChatLogs([]);
                }
            }catch(e){}
        }
        getChatLogs();
    },[showChatUI]);
    
    let chatLists;
    if(chatLogs.length !== 0 && chatLogs[0].roomId === showChatUI.roomId){
        chatLists = chatLogs.map(logs =>{
        if(logs.sender === loginUserInfo.userId){
            return <MyMessage message={logs.message} key={logs.logNo}></MyMessage>;
        } else{
            const user = showChatUI.userInfo.find(user => user.userId === logs.sender);
            return <OtherMessage senderName={user.name} message={logs.message} key={logs.logNo}></OtherMessage>;
        }
        });
    }

    return (
    <Rnd default={{x: 1100, y: 440+window.scrollY, width: 320, height:200, position:'fixed'}} style={{position:"fixed", zIndex:50}}>
            <div className="chatbox-holder">
                <div className="chatbox">
                    <ChatHeader showChatUI={showChatUI} setShowChatUI={setShowChatUI}></ChatHeader>

                    <div className="chat-messages">
                        {chatLists}
                    </div>
                    
                    {/** Chat Box Putter.. */}
                    <div className="chat-input-holder">
                        <textarea className="chat-input" 
                                  value={messageInput}
                                  onChange={inputHandler}></textarea>
                        <input type="button" value="Send" className="message-send" onClick={sendMessageHandler}/>
                    </div>
                </div>
            </div>
    </Rnd>
    )
}

const mapStateToProps = state => ({
    loginUserInfo: state.checkLogin.loginUserInfo,
  });

export default connect(
    mapStateToProps,
)(Chat);
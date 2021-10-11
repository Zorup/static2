import "./chat.css"
import { Rnd } from "react-rnd"
import ChatHeader from "./ChatHeader"
import {MyMessage, OtherMessage} from "./CharMessage"
import {connect} from 'react-redux';
import { useState, useEffect } from "react";
import axios from "axios";
var Stomp = require('stompjs');

function Chat({showChatUI, setShowChatUI, loginUserInfo}){
    const [initSocket, setInitSocket] = useState(false);
    const [chatLogs, setChatLogs]= useState([]);
    let socket;
    let client;

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

    useEffect(()=>{
        const getChatLogs = async()=>{
            let roomId;
            if(loginUserInfo.userId < showChatUI.userInfo[0].userId){
                roomId = loginUserInfo.userId+'-'+showChatUI.userInfo[0].userId;
            }else{
                roomId = showChatUI.userInfo[0].userId +'-'+ loginUserInfo.userId;
            }
        }
        //getChatLogs();
    });

    return (
    <Rnd default={{x: 1100, y: 440+window.scrollY, width: 320, height:200, position:'fixed'}} style={{position:"fixed", zIndex:50}}>
            <div className="chatbox-holder">
                <div className="chatbox">
                    <ChatHeader showChatUI={showChatUI} setShowChatUI={setShowChatUI}></ChatHeader>

                    <div className="chat-messages">
                        <MyMessage message={"Hello"}></MyMessage>
                        <OtherMessage senderName={"Mamun Khandaker"} message={"Hi."}></OtherMessage>
                    </div>
                    
                    {/** Chat Box Putter.. */}
                    <div className="chat-input-holder">
                        <textarea className="chat-input"></textarea>
                        <input type="button" value="Send" className="message-send" />
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
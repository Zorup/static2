import "./chat.css"
import { Rnd } from "react-rnd"
import ChatHeader from "./ChatHeader"
import {MyMessage, OtherMessage} from "./CharMessage"
import {connect} from 'react-redux';
import { useState, useEffect } from "react";
import {postChatMsg} from '../../service/fetch'

var Stomp = require('stompjs');

const connectPromise = () =>
    new Promise((resolve, reject) => {
        const socket = new WebSocket(`${process.env.REACT_APP_SOCK_URL}/chat/chat-conn`);
        const stompClient = Stomp.over(socket);
        stompClient.debug = (e) => {console.log(e)
                                    };
        const onConnect = () => resolve(stompClient);
        const onError = error => reject(new Error(error));
        stompClient.connect({}, onConnect, onError);
    });

function Chat({showChatUI, setShowChatUI, loginUserInfo, initSocket, setInitSocket}){
    const [messageInput, setMessageInput] = useState("");
    const [client, setClient] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

    const publish = (msg, targetId) => {
        if (!client) return;
        client.send(`/app/send/${targetId}`, {}, msg);
    };

    const insertNewChatLogs = (item) => {
        const newChatLogs = [...showChatUI.chatLogs];
        newChatLogs.push(item);
        setShowChatUI({
            ...showChatUI,
            chatLogs: newChatLogs
            }
        );
    }

    /** subscribe */
    useEffect(()=>{
        if (!client || client.counter !== 0) return;
        client.subscribe(`/topic/${loginUserInfo.userId}`, function(m){
            setNewMessage(JSON.parse(m.body))
        });
    });

    useEffect(()=>{
        if(newMessage !== null){
            if(showChatUI.roomId === newMessage.roomId){
                console.log("this message is current chat room Messages");
                if(newMessage.sender !== loginUserInfo.userId){
                    insertNewChatLogs(newMessage);
                }
            }else{}
            setNewMessage(null);
        }
    }, [newMessage]);

    const inputHandler = (e) =>{
        setMessageInput(e.target.value);
    }

    const sendMessageHandler = ()=>{
        const postChatLog = async()=>{
            try{
                const param = {
                    roomId: showChatUI.roomId,
                    sender: loginUserInfo.userId,
                    message: messageInput
                };
                const response = await postChatMsg(param)
                showChatUI.userInfo.forEach(user => {
                    publish(JSON.stringify(response.data), user.userId);
                });
                setMessageInput("");
                insertNewChatLogs(response.data);
            }catch(e){}
        }
        postChatLog();
    }

    useEffect(()=>{
        const connect = async () => {
            try{
                const stompClient = await connectPromise();
                setClient(stompClient);
            }catch(e){}
        }

        if(!initSocket){
            connect();
            setInitSocket(true);
        }
    },[initSocket, setInitSocket])
    
    let chatLists;
    if(showChatUI.chatLogs.length !== 0){
        chatLists = showChatUI.chatLogs.map(logs =>{
        if(logs.sender === loginUserInfo.userId){
            return <MyMessage message={logs.message} key={logs.logNo}></MyMessage>;
        } else{
            const user = showChatUI.userInfo.find(user => user.userId === logs.sender);
            return <OtherMessage senderName={user.name} message={logs.message} key={logs.logNo}></OtherMessage>;
        }
        });
    }

    return (
    <Rnd default={{x: 1160, y: 300, width: 320, height:200, position:'fixed'}} 
         style={{position:"fixed", zIndex:50}}
         dragHandleClassName={'handle'}
         >
            <div className="chatbox-holder">
                <div className="chatbox">
                    <div className="handle">
                        <ChatHeader showChatUI={showChatUI} setShowChatUI={setShowChatUI} setInitSocket={setInitSocket}></ChatHeader>
                    </div>
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
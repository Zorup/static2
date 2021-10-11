import "./chat.css"
import { Rnd } from "react-rnd"
import ChatHeader from "./ChatHeader"
import {MyMessage, OtherMessage} from "./CharMessage"
import {connect} from 'react-redux';
import { useState, useEffect } from "react";
import axios from "axios";
var Stomp = require('stompjs');

const connectPromise = () =>
    new Promise((resolve, reject) => {
        const socket = new WebSocket(`${process.env.REACT_APP_SOCK_URL}/chat/chat-conn`);
        const stompClient = Stomp.over(socket);
        stompClient.debug = (e) => {console.log(e)};
        const onConnect = () => resolve(stompClient);
        const onError = error => reject(new Error(error));
        stompClient.connect({}, onConnect, onError);
    });

function Chat({showChatUI, setShowChatUI, loginUserInfo, initSocket, setInitSocket}){
    const [chatLogs, setChatLogs]= useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [client, setClient] = useState(null);

    const publish = (msg, targetId) => {
        if (!client) return;
        client.send(`/app/send/${targetId}`, {}, msg);
    };

    /** subscribe */
    (function(){
        if (!client || client.counter !== 0) return;
        client.subscribe(`/topic/${loginUserInfo.userId}`, function(m){
            console.log(JSON.parse(m.body));
            const newChatLogs = [...chatLogs];
            newChatLogs.push(JSON.parse(m.body));
            //오류남 .. setChatLogs(newChatLogs);
        });
    })();

    const inputHandler = (e) =>{
        setMessageInput(e.target.value);
    }

    const sendMessageHandler = ()=>{
        const postChatLog = async()=>{
            try{
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
                /** 한번에 처리할수 있는 방법이 없을까? 차후 보완해야될 부분중 하나. 성능상 문제가 있을것 같음. */
                showChatUI.userInfo.forEach(user => {
                    publish(JSON.stringify(response.data), user.userId);
                });
                publish(JSON.stringify(response.data), 2);
                setMessageInput("");
                const newChatLogs = [...chatLogs];
                newChatLogs.push(response.data);
                setChatLogs(newChatLogs);
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
                    <ChatHeader showChatUI={showChatUI} setShowChatUI={setShowChatUI} setInitSocket={setInitSocket}></ChatHeader>

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
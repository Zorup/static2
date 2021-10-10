import "./chat.css"
import { Rnd } from "react-rnd"
import ChatHeader from "./ChatHeader"
import {MyMessage, OtherMessage} from "./CharMessage"

export default function Chat({showChatUI, setShowChatUI}){
    
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
import "./chat.css"
import { Rnd } from "react-rnd"

export default function Chat(){

    return (
<>
    <Rnd default={{x:1100, y:250, width: 320, height:200}}>
        <div className="chatbox-holder">
            <div className="chatbox">
                {/** Chat Box Header */}
                <div className="chatbox-top">
                    <div className="chatbox-avatar">
                        <img src="https://gravatar.com/avatar/2449e413ade8b0c72d0a15d153febdeb?s=512&d=https://codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png" />
                    </div>
                    <div className="chat-partner-name">
                        <span className="status online"></span>
                        사람명
                    </div>
                    <div className="chatbox-icons">
                        <a href="javascript:void(0);"><i className="fa fa-minus"></i></a>
                        <a href="javascript:void(0);"><i className="fa fa-close"></i></a>       
                    </div>      
                </div>
                
                {/** Chat 메시지 */}
                <div className="chat-messages">
                    <div className="message-box-holder">
                        <div className="message-box">
                        Hello
                        </div>
                    </div>
                
                    <div className="message-box-holder">
                        <div className="message-sender">
                        Mamun Khandaker
                        </div>
                        <div className="message-box message-partner">
                        Hi.
                        </div>
                    </div>
                    
                    <div className="message-box-holder">
                        <div className="message-box">
                        How are you doing?
                        </div>
                    </div>
                    
                    <div className="message-box-holder">
                        <div className="message-sender">
                        Mamun Khandaker
                        </div>
                        <div className="message-box message-partner">
                        I'm doing fine. How about you?
                        </div>
                    </div>
                    
                    <div className="message-box-holder">
                        <div className="message-box">
                        I am fine.
                        </div>
                    </div>
                    
                    <div className="message-box-holder">
                        <div className="message-box">
                        Do you know why I knocked you today?
                        </div>
                    </div>
                    
                    <div className="message-box-holder">
                        <div className="message-box">
                        There's something important I would like to share with you. Do you have some time?
                        </div>
                    </div>
                    
                    <div className="message-box-holder">
                        <div className="message-sender">
                        Mamun Khandaker
                        </div>
                        <div className="message-box message-partner">
                        Yeah sure. Let's meet in the Einstein cafe this evening and discuss the matter.
                        </div>
                    </div>
                    
                    <div className="message-box-holder">
                        <div className="message-sender">
                        Mamun Khandaker
                        </div>
                        <div className="message-box message-partner">
                        I thought of coming to your place and discuss about it but I had to finish my projects and I didn't have enough time to go out of the house.
                        </div>
                    </div>      
                </div>
                
                {/** Chat Box Putter.. */}
                <div className="chat-input-holder">
                    <textarea className="chat-input"></textarea>
                    <input type="submit" value="Send" className="message-send" />
                </div>
            </div>
        </div>
    </Rnd>
</>
    )
}
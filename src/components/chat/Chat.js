import "./chat.css"

export default function Chat(){
    return (
        <>
            <div id="chat-list" className="chat-list">
                <ul>
                    <li><div className="chat-list-top">채팅 목록</div></li>
                    <li><div className="chat-list-bottom"></div></li>
                </ul>
            </div>

            {/** 채팅버튼 */}
            <input id="button-chat-list" className="button-chat-list" type="button" value="대화"/>
        </>
    )
}
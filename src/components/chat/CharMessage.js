export function MyMessage({message}){
    return(
        <div className="message-box-holder">
            <div className="message-box">
                {message}
            </div>
        </div>
    )
}

export function OtherMessage({senderName, message}){
    return(
        <div className="message-box-holder">
            <div className="message-sender">
            {senderName}
            </div>
            <div className="message-box message-partner">
            {message}
            </div>
        </div>
    )
}
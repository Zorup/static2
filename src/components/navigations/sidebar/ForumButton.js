export default function ForumButton({setForum, forum}){
    const handleOnClick = () => {
        setForum(forum.forumId);
    };

    return(
        <button className="nav-link abtn" onClick={handleOnClick}>
            <i className="fas fa-fw fa-square"></i>
            <span>{forum.forumName}</span>
        </button>
    )
}
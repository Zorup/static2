export default function ForumButton({setForum, forum}){
    const handleOnClick = () => {
        window.location.hash = `forum/${forum.forumId}`;
        setForum(forum.forumId);
    };

    return(
        <button className="nav-link abtn" onClick={handleOnClick}>
            <i className="fas fa-fw fa-square"></i>
            <span>{forum.forumName}</span>
        </button>
    )
}
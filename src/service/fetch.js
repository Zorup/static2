import axios from "axios";

export const api = axios.create({
    baseURL : `${process.env.REACT_APP_API_URL}`,
    withCredentials: true
});

// Access Token 재발급 API
export const reIssuedTokenApi = async (refreshToken) => {
    try{
        await api.get(`auth/v1/refresh`,{headers : {Authorization: `refresh ${refreshToken}`}})
    }catch(e){
        return false;
    }
    return true;
} 

/**----------------------------------------------------------------------- */
// Login Page 사용 API 목록
export const logInApi = (param) =>{
    return api.post(`auth/v1/login`, param);
}

export const getInitialMentionListsApi = (userId) =>{
    return api.get(`fcm/v1/user/${userId}/mentions`);
}

/**----------------------------------------------------------------------- */
// SignIn Page 사용 API 목록
export const signInApi = (param)=> {
    return api.post(`/auth/v1/signin`, param);
}

/**----------------------------------------------------------------------- */
// Group Page 사용 API 목록 
export const getUserListApi = (param) =>{
    return api.get(`/main/v1/group/users`); 
}

export const getPostView = (forumId, oldestId = null) =>{
    if (oldestId === null) return api.get(`/main/v1/forum/${forumId}/postview`);
    return api.get(`/main/v1/forum/${forumId}/postview?oldestId=${oldestId}`);
}

export const getOnePost = (postId) =>{
    return api.get(`/main/v1/post/${postId}`);
}

export const deletePost= (postId) =>{
    return api.delete(`/main/v1/post/${postId}`);
}

/**----------------------------------------------------------------------- */
//components/Post 컴포넌트들에 존재하는 http 요청)
export const postPostLikes = (postId)=>{
    return api.post(`/main/v1/like?postId=${postId}`);
}

export const postPost = (data)=>{
    return api.post(`/main/v1/post`, data);
}

export const postComment = (params)=>{
    return api.post(`/main/v1/comment`,
                    params,
                    {        
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        withCredentials: true
                    }
                );
}

export const postPushMessage = (pushRequestData)=>{
    return api.post(`/fcm/v1/fcm-msg`, pushRequestData);
}

/**----------------------------------------------------------------------- */
//components/navigations/topbar 컴포넌트들에 존재하는 http 요청)
export const patchMentionReadYn = (notificationId)=>{
    return api.patch(`/fcm/v1/notification/${notificationId}`);
};

export const postLogOut = (userId)=>{
    return api.post(`/auth/v1/logout/user/${userId}`);
}

/**----------------------------------------------------------------------- */
//components/navigations/sidebar 컴포넌트들에 존재하는 http 요청)
export const postForumApi = (forumName)=>{
    return api.post(`/main/v1/forum?forumName=${forumName}`);
}

export const deleteForumApi = (data)=>{
    return api.delete(
        `/main/v1/forum`,
        data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
}

export const getForumList = () => {
    return api.get('/main/v1/forum');
}

export const getChatRooms = (userId) =>{
    return api.get(`/chat/${userId}/rooms`);
}

export const postChatRoom = (data) =>{
    return api.post(`/chat/room`, data);
}

export const deleteChatRoom = (userId, roomId) =>{
    return api.delete(`/chat/${userId}/room/${roomId}`);
}

export const getChatLogs = (roomId)=>{
    return api.get(`/chat/${roomId}/chat-logs`);
}

/**----------------------------------------------------------------------- */
//components/chat 컴포넌트들에 존재하는 http 요청)
export const postChatMsg = (param) =>{
    return api.post(`/chat/chat-log`, param);
}

export const deleteComment = (param) => {
    return api.delete(`/main/v1/comment/${param}`);
}
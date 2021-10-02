// 멘션 관련 자료 구조 
export class UserInformation{
    constructor(userId, userName){
        if(!Number.isInteger(userId)){
            throw new Error("UserPk must be integer");
        }
        if(typeof userName !== 'string'){
            throw new Error("UserName must be string");
        }
        this.userId = userId;
        this.userName = userName;
    }
}

export class DeepUserInfoSet extends Set {
    add (o) {
        for (let i of this)
            if (this.deepCompare(o, i))
                return this;
        super.add.call(this, o);
        return this;
    };

    has(userId){
        for(let i of this){
            if(userId === i.userId){
                return true;
            }
        }
        return false;
    };

    deepCompare(o, i) {
        return o.userId === i.userId;
    };
}

export const getNotiRequestData = (sender, pushTargetUsers, currentTargetId, eventType) => {
    let pushRequestData = {
        "sender": sender,
        "receivers":[],
        "eventType": eventType
    };
    if(eventType === true) {
        pushTargetUsers[currentTargetId].forEach(v => {
            pushRequestData.receivers.push(v);
        });
    }
    return pushRequestData;
};

// Top Bar에서 활용될 리듀서 관련 정보들
const LOG_IN = 'MENTION/LOG_IN' //로그인 시 해당 사용자의 ID로 데이터를 받아옴.
const ON_MESSAGE = 'ON_MESSAGE'  //FCM 메시지를 수신시 화면에 리랜더링을 위한 액션 
const CLICK_ITEM = 'CLICK_ITEM'  //알람영역 클릭 시 읽기처리 및 화면 리렌더링을 위함

export const getInitMentionByLogin = (data) => ({type: LOG_IN, mentionList : data});
export const getMentionByFcm = (data) => ({type: ON_MESSAGE, data: data});
export const setReadYnTrue = (notificationId) => ({type:CLICK_ITEM, data: notificationId});

const initialState = {
    mentionAlertList : []
};

function mentionDispatcher(state = initialState, action){
    console.log("reducer call");
    switch(action.type){
        case LOG_IN:
            return{
                ...state,
                mentionAlertList: action.mentionList
            };
        case ON_MESSAGE:
            const newData = [...state.mentionAlertList];
            newData.push(action.data);
            return{
                ...state,
                mentionAlertList: newData
            };
        case CLICK_ITEM:
            const newArray = [...state.mentionAlertList].map((element, index)=>{
                if(element.notificationId === action.data){
                    element.readYn = true;
                }
                return element;
            });
            return {
                ...state,
                mentionAlertList: newArray
            };
        default:
            return state;
    }
}

export default mentionDispatcher;
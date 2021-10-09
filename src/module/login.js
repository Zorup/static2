const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

export const logIn = (input) => ({type: LOG_IN, loginUserInfo: input});
export const logOut = () => ({type: LOG_OUT});
export const reIssuedToken = ()=>{

};
const initialState = {
    loginUserInfo : {},
    isLogin : false
};

function checkLogin(state = initialState, action){
    switch(action.type){
        case LOG_IN:
            return{
                ...initialState,
                loginUserInfo: action.loginUserInfo,
                isLogin: true
            };
        case LOG_OUT:
            return{
                ...initialState,
                loginUserInfo : {},
                isLogin : false
            };
        default:
            return state;
    }
}

export default checkLogin;
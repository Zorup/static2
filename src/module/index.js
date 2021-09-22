import { combineReducers } from "redux";
import checkLogin from "./login";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
{/** 각 리듀서를 해당 파일에서 combineReducer로 하나로 묶어서 제공한다. */}

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ["checkLogin"],
}

const rootReducer = combineReducers({
    checkLogin
});

export default persistReducer(persistConfig, rootReducer);

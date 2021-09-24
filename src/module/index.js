import { combineReducers } from "redux";
import checkLogin from "./login";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ["checkLogin"],
}

const rootReducer = combineReducers({
    checkLogin
});

export default persistReducer(persistConfig, rootReducer);

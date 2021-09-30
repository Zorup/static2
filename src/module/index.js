import { combineReducers } from "redux";
import checkLogin from "./login";
import mentionDispatcher  from './mention'
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ["checkLogin", "mentionDispatcher"],
}

const rootReducer = combineReducers({
    checkLogin,
    mentionDispatcher
});

export default persistReducer(persistConfig, rootReducer);

import './App.css';
import axios from 'axios';
import GroupPage from './pages/GroupPage';
import LoginPage from './pages/LoginPage';
import {connect} from 'react-redux';
import {useEffect} from "react"

import {initFCM} from "./module/login"

import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

function App({isLogin, loginUserInfo, initFcm, setInitFcm}) {

  useEffect(()=>{
    if(!initFcm && isLogin){
      let firebaseConfig = {
        apiKey: "AIzaSyDcO66arFwaWHVYAWpGciqGGQV9cOGJM2Q",
        authDomain: "alarm-1830c.firebaseapp.com",
        projectId: "alarm-1830c",
        storageBucket: "alarm-1830c.appspot.com",
        messagingSenderId: "831418413127",
        appId: "1:831418413127:web:d4fc457e510db7556cc162",
        measurementId: "G-6YP6W2WJ89"
      };
      initializeApp(firebaseConfig);
      const messaging = getMessaging();

      getToken(messaging).then((currentToken)=>{
        if(currentToken){
          const response = axios.patch(
            `http://localhost:8081/main/v1/user/${loginUserInfo.userId}?push-token=${currentToken}`, 
            null,
            {
              withCredentials: true
            }
          );

          onMessage(messaging, (payload)=>{
            console.log('Message received. ', payload);
          });
          setInitFcm();
        }else{
          console.log("firebase initializing error..");
        }
      });
    }
  });
  
  return isLogin? <GroupPage/> : <LoginPage/>
}

const mapStateToProps = state => ({
  isLogin: state.checkLogin.isLogin,
  loginUserInfo: state.checkLogin.loginUserInfo,
  initFcm : state.checkLogin.initFcm
});

const mapDispatchToProps = dispatch => ({
  setInitFcm: ()=>{
    dispatch(initFCM());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
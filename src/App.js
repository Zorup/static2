import './App.css';
import axios from 'axios';
import GroupPage from './pages/GroupPage';
import LoginPage from './pages/LoginPage';
import {connect} from 'react-redux';
import {useEffect} from "react"
import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyDcO66arFwaWHVYAWpGciqGGQV9cOGJM2Q",
  authDomain: "alarm-1830c.firebaseapp.com",
  projectId: "alarm-1830c",
  storageBucket: "alarm-1830c.appspot.com",
  messagingSenderId: "831418413127",
  appId: "1:831418413127:web:d4fc457e510db7556cc162",
  measurementId: "G-6YP6W2WJ89"
};
//initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onMessage(payload => {
  console.log(payload.data);
});

function App({isLogin, loginUserInfo}) {

  useEffect(()=>{
    if(isLogin){
      console.log(loginUserInfo.userId+ "token save api call..");
      messaging.getToken().then((currentToken)=>{
        console.log(currentToken);
        if(currentToken){
          const response = axios.patch(
            `http://localhost:8081/main/v1/user/${loginUserInfo.userId}?push-token=${currentToken}`, 
            null,
            {
              withCredentials: true
            }
          );
        }else{
          console.log("firebase initializing error..");
        }
      });
    }
  }, [isLogin, loginUserInfo.userId]);
  
  return isLogin? <GroupPage/> : <LoginPage/>
}

const mapStateToProps = state => ({
  isLogin: state.checkLogin.isLogin,
  loginUserInfo: state.checkLogin.loginUserInfo
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
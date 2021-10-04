import React, { useState, useCallback } from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
import {logIn} from '../module/login'
import {getInitMentionByLogin} from '../module/mention'

function LoginPage({logIn, setUserMentionAlert}){
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const onChagneUserId = useCallback (e=>setUserId(e.target.value), []);
    const onChangePassword = useCallback (e=>setPassword(e.target.value), []);
    const moveSignInPage = useCallback(()=>{window.location.href="/sign-in"},[]);

    const signIn = async ()=>{
        const params = {
            loginId: userId,
            password: password
        };

        try{
            const response = await axios.post(
              'http://localhost:8081/auth/v1/login', 
              params,
              {
                withCredentials: true
              }
            );
            //로그인 시 초기 알람 화면과 관련된 리스트, 유저 정보를 가져와서 세션 스토리지에 넣는다.
            const mentionRequest = await axios.get(
                `http://localhost:8081/fcm/v1/user/${response.data.data.userId}/mentions`, 
                {
                    withCredentials: true
                }
            );
            setUserMentionAlert(mentionRequest.data);
            logIn(response.data.data);
          }catch(e){
              alert("login 실패");
          }
    }

    return(
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <div className="user">
                                        <div className="form-group">
                                            <input type="text" 
                                                   className="form-control form-control-user"
                                                   placeholder="Enter Your Id...."
                                                   value={userId}
                                                   onChange={onChagneUserId}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" 
                                                   className="form-control form-control-user"
                                                   placeholder="Password"
                                                   value={password}
                                                   onChange={onChangePassword}/>
                                        </div>
                                        <button className="btn btn-primary btn-user btn-block" onClick ={signIn}>
                                            Login
                                        </button>
                                    </div>
                                    <hr></hr>
                                    <div className="text-center">
                                        <button className="small abtn">Forgot Password?</button>
                                    </div>
                                    <div className="text-center">
                                        <button className="small abtn" onClick={moveSignInPage}>Create an Account!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    logIn: (data)=>{
        dispatch(logIn(data));
    },
    setUserMentionAlert: (data)=>{
        dispatch(getInitMentionByLogin(data));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage)
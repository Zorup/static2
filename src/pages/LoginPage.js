import React, { useState, useCallback } from 'react';
import axios from 'axios';

function LoginPage(){
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const onChagneUserId = useCallback (e=>setUserId(e.target.value), []);
    const onChangePassword = useCallback (e=>setPassword(e.target.value), []);

    const signIn = async ()=>{
        try{
            await axios.post(
              'http://localhost:8081/main/v1/login',{
                loginId: userId,
                password: password
              }
            );
            sessionStorage.setItem('login', 'true');
            window.location.reload();
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
                                        <button className="small abtn">Create an Account!</button>
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

export default LoginPage
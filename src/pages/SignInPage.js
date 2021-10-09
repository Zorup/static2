import {useState} from "react"
import axios from 'axios';

export default function SignInPage() {
    const [signInParam, setSignInParam] = useState({
        name:"",
        loginId:"",
        password:"",
        position:"",
        department:"",
        email:""
    });
    const {name, loginId, password,  position, department, email} = signInParam;

    const [validPassword, setValidPassword]=useState("");

    const onChangeHandler = e=>{
        const newParam = {
            ...signInParam,
            [e.target.name]: e.target.value
        };
        setSignInParam(newParam);
    };

    const onChangeValidPassword = e=>{
        setValidPassword(e.target.value);
    }

    const onClickHandler = async ()=>{
        console.log(signInParam);
        if(validPassword!==password){
            alert("입력한 비밀번호가 재입력한 비밀번호와 일치하지 않습니다.")
            return;
        }
        try{
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/v1/signin`,
                signInParam,
                {
                    withCredentials: true
                }
            );
            alert("회원가입이 완료되었습니다.");
            console.log(response);
            window.location.href="/"
        } catch(e){
            alert("서버 연결이 원할하지 않습니다.");
        }
    }

    return (
        <div class="container">
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>

                            <div class="user">
                                <div class="form-group">
                                    <input type="text" 
                                           class="form-control form-control-user"
                                           placeholder="로그인시 사용할 아이디를 입력해주세요."
                                           name="loginId"
                                           value={loginId}
                                           onChange={onChangeHandler}/>
                                </div> 

                                <div class="form-group row"> 
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" 
                                               class="form-control form-control-user"
                                               placeholder="비밀번호를 입력하세요."
                                               name="password"
                                               value={password}
                                               onChange={onChangeHandler}/>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" 
                                               class="form-control form-control-user"
                                               placeholder="비밀번호를 재입력하세요."
                                               name="validPassword"
                                               value={validPassword}
                                               onChange={onChangeValidPassword}/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <input type="text" 
                                           class="form-control form-control-user" 
                                           placeholder="이름을 입력하세요."
                                           name="name"
                                           value={name}
                                           onChange={onChangeHandler}/>
                                </div>

                                <div class="form-group">
                                    <input type="email" 
                                           class="form-control form-control-user"
                                           placeholder="이메일 주소를 입력하세요."
                                           name="email"
                                           value={email}
                                           onChange={onChangeHandler}/>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" 
                                               class="form-control form-control-user"
                                               name="department" 
                                               placeholder="부서를 입력하세요."
                                               value={department}
                                               onChange={onChangeHandler}/>
                                    </div>
                                    <div class="col-sm-6"> 
                                        <input type="text" 
                                               class="form-control form-control-user"
                                               name="position" 
                                               placeholder="직책을 입력하세요."
                                               value={position}
                                               onChange={onChangeHandler}/>
                                    </div>
                                </div>

                                <a class="btn btn-primary btn-user btn-block" onClick={onClickHandler}>
                                    회원가입
                                </a>
                            </div>

                            <hr/>
                            <div class="text-center">
                                <a class="small" href="#">Forgot Password?</a>
                            </div>
                            <div class="text-center">
                                <a class="small" href="/">Already have an account? Login!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
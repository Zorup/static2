import {connect} from 'react-redux';
import axios from 'axios';
import {logOut} from '../../../module/login'
import {clearMentionList} from '../../../module/mention'

function UserInformation({loginUserInfo, clearMentionList, clearUserInfo}){
    const onClickLogOut = async () =>{
        try{
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/v1/logout/user/${loginUserInfo.userId}`,
                null,
                {
                    withCredentials: true
                }
            );
            clearMentionList();
            clearUserInfo();
        }catch(e){}
    };

    return(
        <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small login-user-name">{loginUserInfo.name}</span>
                <img className="img-profile rounded-circle"
                     src="img/undraw_profile_1.svg"></img>
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                 aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                </a>
                <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                </a>
                <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" 
                   data-toggle="modal"
                   data-target="#logoutModal"
                   onClick={onClickLogOut}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                </a>
            </div>
        </li>
    )
}

const mapStateToProps = state => ({
    loginUserInfo: state.checkLogin.loginUserInfo,
});

const mapDispatchToProps = dispatch => ({
    clearUserInfo: ()=>{
        dispatch(logOut());
    },
    clearMentionList: ()=>{
        dispatch(clearMentionList());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInformation)
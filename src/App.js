import './App.css';

import GroupPage from './pages/GroupPage';
import LoginPage from './pages/LoginPage';

import {connect} from 'react-redux';

function App({isLogin}) {
  return isLogin? <GroupPage/> : <LoginPage/>
}

const mapStateToProps = state => ({
  isLogin: state.checkLogin.isLogin
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
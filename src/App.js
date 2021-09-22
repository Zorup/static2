import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
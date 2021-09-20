import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import GroupPage from './pages/GroupPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(sessionStorage.getItem('login') === 'true')
  }, [])

  return isLogin? <GroupPage/> : <LoginPage/>
}

export default App;

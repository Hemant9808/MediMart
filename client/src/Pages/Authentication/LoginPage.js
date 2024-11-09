import React, { useEffect } from 'react';
import LoginForm from '../../Components/Home/Login/LoginForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
 const navigate = useNavigate()
  const {userDetails} = useSelector((state)=>state.auth)
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if(userDetails && userDetails.token){
      navigate('/')
    }
  }, []);


  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;

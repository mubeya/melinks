import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login({ onSuccess, onError }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      text='sign_in_with'
      locale='en'
      type='standard'
      shape='circle'
      size='medium'
      theme='filled_blue'
      width={250}
    />
  );
}

export default Login;
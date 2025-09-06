import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="71366868517-labjf1dtqdti8a9i2kl7l1t3georjvk5.apps.googleusercontent.com"> 
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
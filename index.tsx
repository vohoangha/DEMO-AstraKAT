
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Maintenance from './Maintenance';
import Login from './Login';
import { User } from './types';
import { getUserFromCookie, saveUserToCookie, removeUserCookie } from './utils/storage';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const IS_MAINTENANCE_MODE = false; 

const Root = () => {
  // Initialize state directly from cookie
  const [user, setUser] = useState<User | null>(() => getUserFromCookie());

  const handleLoginSuccess = (loggedInUser: User) => {
    saveUserToCookie(loggedInUser); // Persist to cookie (30 days)
    setUser(loggedInUser);
  };

  const handleSignOut = () => {
    removeUserCookie(); // Clear cookie
    setUser(null);
  };

  if (IS_MAINTENANCE_MODE) {
    return <Maintenance />;
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Pass user object and sign out handler to App
  return <App user={user} onSignOut={handleSignOut} />;
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

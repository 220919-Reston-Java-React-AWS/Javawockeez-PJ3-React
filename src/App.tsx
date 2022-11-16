import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext, User } from './context/user.context';
import { AppRoutes } from './router/AppRoutes';
import Navbar from './components/navbar/Navbar';


function App() {

  const [user, setUser] = useState<User | undefined>();
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Navbar />
        <AppRoutes></AppRoutes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

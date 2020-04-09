import React from 'react';
import './App.css';
import { Home } from './Pages';
import { Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <div>
      <Header/>
      <Route path='/' component={Home} exact/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// States
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

import './App.css';

// Pages
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import NotFound from './components/layout/NotFound';

const ROUTES = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:login', component: User },
  { path: '/404', component: NotFound },
];

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                {ROUTES.map(({ path, component }) =>
                  <Route key={path} exact path={path} component={component} />
                )}
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;

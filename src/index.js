import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import { ProvideAuth, RequireAuth } from './use-auth';
import Posts from "./routes/Posts";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Profile from "./routes/Profile";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <Router>
        <App />
        <Switch>
          <Route exact path="/">
            <Posts />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/profile">
            <RequireAuth>
              <Profile />
            </RequireAuth>
          </Route>
          <Router />
        </Switch>
      </Router>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
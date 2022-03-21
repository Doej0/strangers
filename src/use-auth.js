import React, { useContext, createContext, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { loginUser, registerUser,testMe } from "./api/index";


const authProvider = {
  signin(callback) {
    authProvider.isAuthenticated = testMe();
    setTimeout(callback, 100); // fake async
  },
  signup(callback) {
    authProvider.isAuthenticated = testMe();
    setTimeout(callback, 100);
  },
  signout(callback) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [username, setUsername] = useState(null);

  const signin = (userObject, callback) => {
    return authProvider.signin(() => {
      loginUser(userObject);
      setUsername(userObject.user.username);
      localStorage.setItem("stranger_things_User", userObject.user.username);
      callback()
    });
  }

  const signup = (userObject, callback) => {
    return authProvider.signup(() => {
      registerUser(userObject);
     
      callback()
    });
  }

  const signout = () => {
    return authProvider.signout(() => {
      localStorage.removeItem("stranger_things_User");
      localStorage.removeItem("stranger_things_JWT");

      setUsername(null);
    });
  }

  let auth = { username, signin, signup, signout };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthStatus = () => {
  let auth = useAuth();
  let history = useHistory();

  if (localStorage.getItem("stranger_things_User")) {
    auth.username = localStorage.getItem("stranger_things_User");
  }
  
  if (!auth.username) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.username}!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.username) {
    return <Redirect to="/login" state={{ from: location }} replace />;
  }

  return children;
}




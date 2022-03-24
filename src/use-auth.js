import * as React from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { login, register, testMe } from "./api";

const accessProvider = {
  signin(callback) {
    accessProvider.isAuthenticated = testMe();
    setTimeout(callback, 100); //fake async
  },
  signup(callback) {
    accessProvider.isAuthenticated = testMe();
    setTimeout(callback, 100);
  },
  signout(callback) {
    accessProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

let AuthContext = React.createContext();

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, password, callback) => {
    return accessProvider.signin(() => {
      login(newUser, password).then((token) => {
        localStorage.setItem("user", newUser);
        localStorage.setItem("strangers_things_JWT", token);
      });
      setUser(newUser);
      callback();
    });
  };

  let signup = (newUser, password, callback) => {
    return accessProvider.signup(() => {
      register(newUser, password);

      callback();
    });
  };

  let signout = (callback) => {
    return accessProvider.signout(() => {
      localStorage.clear();
      setUser(null);
      callback();
    });
  };

  React.useEffect(() => {
    function fetchData() {
      testMe().then((result) => {
        if (result.success) {
          setUser(result.data.user.username);
        }
      });
    }
    fetchData();
  }, []);

  let value = { user, signin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/posts"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // instead of dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

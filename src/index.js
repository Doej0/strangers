import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Posts from "./routes/Posts";
import Post from "./routes/Post";
import NoMatch from "./routes/NoMatch";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import { AuthProvider, RequireAuth } from "./use-auth";
import RegisterPage from "./routes/RegisterPage";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="posts" element={<Posts />}>
            <Route
              index
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Select a post</p>
                </main>
              }
            />
            <Route path=":postId" element={<Post />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
  rootElement
);

import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { AuthStatus } from "./use-auth";

export default function App() {
  return (
    <div>
      <AuthStatus />
      <nav className="topnav">
        <Link className="posts" to="/posts">
          Posts
        </Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
}

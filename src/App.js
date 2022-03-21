import { Link } from "react-router-dom";
import './App.css';
import { AuthStatus } from "./use-auth";


const App = () => {
  return (
    <div>
      <AuthStatus />
      <nav>
        <Link to="/">Posts</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </div>
  );
}



export default App;
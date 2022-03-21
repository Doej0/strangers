import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../use-auth";
import "../Login.css";

export const LoginPage = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let from = location.state?.from?.pathname || "/profile";
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      let formData = new FormData(event.currentTarget);
  
      let userObject = {
        user: {
          username: formData.get("username"),
          password: formData.get("password")
        }
      }
  
      auth.signin(userObject, () => {
        history.replace(from);
      });
    }
  
    return (
      <div>
        <p>You must log in to view the page at {from}</p>
  
        <form className="form-login" onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <label htmlFor="name">Username:</label>
          <input type="text" placeholder="Enter Username" name="username" id="name" required />
          <label htmlFor="pwd">Password:</label>
          <input type="text" placeholder="Enter Password" name="password" id="pwd" required />
          <button type="submit">Log in</button>
        </form>
        <Link to="/register">Sign up</Link>
      </div>
    );
}
  
export default LoginPage;
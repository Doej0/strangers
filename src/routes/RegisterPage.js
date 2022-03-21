import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../use-auth";
import "../Login.css";

const RegisterPage = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let from = location.state?.from?.pathname || "/login";
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      let formData = new FormData(event.currentTarget);
  
      let userObject = {
        user: {
          username: formData.get("username"),
          password: formData.get("password")
        }
      }
  
      auth.signup(userObject, () => {
        history.replace(from);
      });
    }
  
    return (
      <div>
        <form className="form-login" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <label htmlFor="name">Username:</label>
          <input type="text" placeholder="Enter Username" name="username" id="name" required />
          <label htmlFor="pwd">Password:</label>
          <input type="text" placeholder="Enter Password" name="password" id="pwd" required />
          <button type="submit">Sign up</button>
        </form>
        <Link to="/register">Login</Link>
      </div>
    );
}
  
export default RegisterPage;
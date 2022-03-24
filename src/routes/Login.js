import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../use-auth";

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/profile";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("uname");
    let password = formData.get("pwd");

    auth.signin(username, password, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          />
          <label htmlFor="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="pwd"
            required
          />
          <input type="submit" value="Log in" />
        </div>
      </form>
      <Link to="/register">Sign up</Link>
    </div>
  );
}

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../use-auth";
const RegisterPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/login";

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("uname");
    let password = formData.get("pwd");
    auth.signup(username, password, () => {
      navigate(from, { replace: true });
    });
  };
  return (
    <div>
      <h2>Register Here</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            id="name"
            required
          />
          <label htmlFor="pwd">Password:</label>
          <input
            type="text"
            placeholder="Enter Password"
            name="password"
            id="pwd"
            required
          />
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

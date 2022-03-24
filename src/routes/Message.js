import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../use-auth";
import "../Login.css";

export const Message = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    let userObject = {
      user: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
    };

    auth.signin(userObject, () => {
      history.replace(from);
    });
  };

  return (
    <div>
      <form className="form-login" onSubmit={handleSubmit}>
        <h2>Create new message</h2>
        <label htmlFor="name">Message:</label>
        <input
          type="text"
          placeholder="Type message"
          name="username"
          id="name"
          required
        />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
};

export default Message;

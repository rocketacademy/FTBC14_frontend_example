import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const navigate = useNavigate();
  const [user, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    let response = await props.axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/auth/signin`,
      user,
      { withCredentials: true }
    );
    console.log(response);

    props.setToken(response.data.token);
    props.setIsLoggedIn(true);
    localStorage.setItem("jwtAccessToken", response.data.token);

    setUserInfo({
      email: "",
      password: "",
    });
    navigate("/");
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <props.Link to="/"> Home</props.Link>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <input value="submit" type="submit" />
      </form>
    </>
  );
}

export default LoginForm;

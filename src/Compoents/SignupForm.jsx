import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const navigate = useNavigate();
  const [user, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: 0,
    gender: false,
    password: "",
  });

  const handleSelect = (e) => {
    console.log(e.target.value);
    setUserInfo((prevState) => {
      return { ...prevState, gender: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    let response = await props.axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/auth/signup`,
      user,
      { withCredentials: true }
    );
    console.log(response);

    props.setToken(response.data.token);
    props.setIsLoggedIn(true);
    localStorage.setItem("jwtAccessToken", response.data.token);

    setUserInfo({
      firstName: "",
      lastName: "",
      email: 0,
      gender: false,
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
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          placeholder="Add student first name"
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          placeholder="Add student last name"
        />
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
        <label>Gender</label>
        <select onChange={handleSelect} defaultValue={user.gender}>
          <option value={true}>Male</option>
          <option value={false}>Female</option>
        </select>

        <input value="submit" type="submit" />
      </form>
    </>
  );
}

export default LoginForm;

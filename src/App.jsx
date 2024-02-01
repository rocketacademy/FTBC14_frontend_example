import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import UserForm from "./Compoents/UserForm.jsx";
import UserProfile from "./Compoents/UserProfile";
import Landing from "./Compoents/Landing";
import Classes from "./Compoents/Classes";
import UsersClasses from "./Compoents/UsersClasses";
import ClassesForm from "./Compoents/ClassesForm";
import AddressForm from "./Compoents/AddressForm";
import SignUpForm from "./Compoents/SignupForm";
import LoginForm from "./Compoents/LoginForm";
// import Cookies from "js-cookie";

function App() {
  const [students, setStudents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  // const [refreshToken, setRefreshToken] = useState("");
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SOME_BACKEND_URL}/`,
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    // if the user is logged in previously then log them in
    if (localStorage.getItem("jwtAccessToken")) {
      setToken(localStorage.getItem("jwtAccessToken"));
      setIsLoggedIn(true);
    }

    // Cookies implementation for refresh token - not completed
    // if (Cookies.get("jwt-token")) {
    //   console.log("token", Cookies.get("jwt-token"));
    //   console.log("refresh", Cookies.get("jwt-refresh"));

    //   setToken(Cookies.get("jwt-token"));
    //   setRefreshToken(Cookies.get("jwt-refresh"));
    //   setIsLoggedIn(true);
    // }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Landing
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          // setUser={setUser}
          students={students}
          setStudents={setStudents}
          axios={axios}
          Link={Link}
        />
      ),
    },
    {
      path: "/signup",
      element: (
        <SignUpForm
          axios={axios}
          Link={Link}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/login",
      element: (
        <LoginForm
          axios={axios}
          Link={Link}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/form",
      element: <UserForm axios={axios} setStudents={setStudents} Link={Link} />,
    },
    {
      path: "/class",
      element: <ClassesForm token={token} axios={axios} Link={Link} />,
    },
    {
      path: "/profile/:id",
      element: <UserProfile axios={axios} Link={Link} />,
    },
    {
      path: "/classes",
      element: <Classes axios={axios} />,
    },
    {
      path: "/usersClasses",
      element: <UsersClasses axios={axios} Link={Link} />,
    },
    {
      path: "/addressForm",
      element: (
        <AddressForm
          axios={axios}
          instance={instance}
          Link={Link}
          token={token}
        />
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

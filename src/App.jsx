import "./App.css";
import axios from "axios";
import { useState } from "react";

import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import UserForm from "./Compoents/UserForm.jsx";
import UserProfile from "./Compoents/UserProfile";
import Landing from "./Compoents/Landing";
import Classes from "./Compoents/Classes";
import UsersClasses from "./Compoents/UsersClasses";
import ClassesForm from "./Compoents/ClassesForm";
import AddressForm from "./Compoents/AddressForm";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const RequireAuth = ({ children, redirectTo, user }) => {
    console.log("require Auth", user);
    const isAuthenticated = user.email ? true : false;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  };

  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Landing
          students={students}
          setStudents={setStudents}
          axios={axios}
          Link={Link}
          setUser={setUser}
          user={user}
        />
      ),
    },
    {
      path: "/form",
      element: (
        <RequireAuth redirectTo={"/"} user={user}>
          <UserForm axios={axios} setStudents={setStudents} Link={Link} />{" "}
        </RequireAuth>
      ),
    },
    {
      path: "/class",
      element: <ClassesForm axios={axios} Link={Link} />,
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
      element: <AddressForm axios={axios} Link={Link} />,
    },
  ]);

  return (
    <div>
      <Auth0Provider
        domain={`${import.meta.env.VITE_SOME_AUTH0_DOMAIN}`}
        clientId={`${import.meta.env.VITE_SOME_AUTH0_CLIENT_ID}`}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://school/api",
          scope:
            "read:current_user update:current_user_metadata openid profile email",
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </div>
  );
}

export default App;

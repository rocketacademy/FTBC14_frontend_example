import "./App.css";
import axios from "axios";
import { useState } from "react";

import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import UserForm from "./Compoents/UserForm.jsx";
import UserProfile from "./Compoents/UserProfile";
import Landing from "./Compoents/Landing";
import Classes from "./Compoents/Classes";
import UsersClasses from "./Compoents/UsersClasses";
import ClassesForm from "./Compoents/ClassesForm";
import AddressForm from "./Compoents/AddressForm";

function App() {
  const [students, setStudents] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Landing
          students={students}
          setStudents={setStudents}
          axios={axios}
          Link={Link}
        />
      ),
    },
    {
      path: "/form",
      element: <UserForm axios={axios} setStudents={setStudents} Link={Link} />,
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

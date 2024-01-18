import "./App.css";
import axios from "axios";
import { useState } from "react";

import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import UserForm from "./Compoents/UserForm.jsx";
import UserProfile from "./Compoents/UserProfile";
import Landing from "./Compoents/Landing";

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
      path: "/profile/:id",
      element: <UserProfile axios={axios} Link={Link} />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

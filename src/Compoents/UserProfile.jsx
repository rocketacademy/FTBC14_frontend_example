import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserProfile(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});

  console.log("id", id);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await props.axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/students/${id}`
        );
        let unPacked = data.data;
        console.log(unPacked);
        setUser(unPacked);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <props.Link to="/"> Home</props.Link>
      <props.Link to="/form"> Form</props.Link>

      <h1>Profile</h1>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <h4>
        {user.email} - {user.gender == true ? "Male" : "Female"}
      </h4>
    </div>
  );
}

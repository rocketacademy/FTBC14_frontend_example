import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

export default function Classes(props) {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(1);
  const [users, setUsers] = useState([]);

  let options = [
    { value: 1, label: "Bob" },
    { value: 2, label: "Jessica" },
    { value: 3, label: "Joey" },
  ];

  if (users.length > 0) {
    options = users.map((user) => {
      return { value: user.id, label: user.firstName };
    });
  }

  useEffect(() => {
    let getData = async () => {
      let data = await props.axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/classes`
      );
      console.log(data.data);
      setClasses(data.data);
    };
    getData();

    let getUsers = async () => {
      let data = await props.axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/students`
      );
      console.log(data.data);
      console.log(data.data);
      setUsers(data.data);
    };

    getUsers();
  }, []);

  const handleAssign = async (classId) => {
    console.log(classId);
    let token = localStorage.getItem("jwtAccessToken");
    await props.axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/students/classes`,
      {
        userId: selectedOption.value,
        classId: classId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate("/usersClasses");
  };

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      {classes && classes.length > 0 ? (
        classes.map((classInstance) => (
          <div
            key={classInstance.id}
            style={{
              backgroundColor: classInstance.fullTime ? "#2b2b2b" : "#127475",
            }}
          >
            <button
              style={{ backgroundColor: "#127527" }}
              onClick={() => handleAssign(classInstance.id)}
            >
              Assign to Class
            </button>
            <h2>{classInstance.name}</h2>
            <h3>{classInstance.description}</h3>
            <h4>{classInstance.teacher}</h4>
          </div>
        ))
      ) : (
        <p>No classes added, please add a class</p>
      )}
    </div>
  );
}

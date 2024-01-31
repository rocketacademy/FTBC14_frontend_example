import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

const options = [
  { value: 1, label: "Bob" },
  { value: 2, label: "Jessica" },
  { value: 3, label: "Joey" },
];

export default function Classes(props) {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(1);

  useEffect(() => {
    let getData = async () => {
      let data = await props.axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/classes`
      );
      console.log(data.data);
      setClasses(data.data);
    };
    getData();
  }, []);

  const handleAssign = async (classId) => {
    console.log(classId);
    await props.axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/students/classes`,
      {
        userId: selectedOption.value,
        classId: classId,
      }
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

import axios from "axios";
import { useState } from "react";

function UserForm(props) {
  const [student, setStudentInfo] = useState({
    name: "",
    age: 0,
    course: "",
    gender: false,
  });

  const handleSelect = (e) => {
    console.log(e.target.value);
    setStudentInfo((prevState) => {
      return { ...prevState, gender: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student);

    let response = await axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/students`,
      student
    );
    console.log(response);

    props.setStudents((prevState) => {
      return [...prevState, response.data[0]];
    });

    setStudentInfo({
      name: "",
      age: 0,
      course: "",
    });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setStudentInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Add student name"
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
          />
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={student.course}
            onChange={handleChange}
            placeholder="Add student course"
          />
          <label>Gender</label>
          <select onChange={handleSelect} defaultValue={student.gender}>
            <option value={true}>Male</option>
            <option value={false}>Female</option>
          </select>

          <input value="submit" type="submit" />
        </form>
      </div>
    </>
  );
}

export default UserForm;

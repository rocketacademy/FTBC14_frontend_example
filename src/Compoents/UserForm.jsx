import { useState } from "react";

function UserForm(props) {
  const [student, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    email: 0,
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

    let response = await props.axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/students`,
      student
    );
    console.log(response);

    props.setStudents((prevState) => {
      return [...prevState, response.data[0]];
    });

    setStudentInfo({
      firstName: "",
      lastName: "",
      email: 0,
      gender: false,
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
      <props.Link to="/"> Home</props.Link>

      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
          placeholder="Add student first name"
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
          placeholder="Add student last name"
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={student.email}
          onChange={handleChange}
        />
        <label>Gender</label>
        <select onChange={handleSelect} defaultValue={student.gender}>
          <option value={true}>Male</option>
          <option value={false}>Female</option>
        </select>

        <input value="submit" type="submit" />
      </form>
    </>
  );
}

export default UserForm;

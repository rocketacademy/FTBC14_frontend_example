import { useState } from "react";

export default function EditModal(props) {
  console.log(props);
  const [student, setStudentInfo] = useState({
    firstName: props.editingInfo.firstName || "",
    lastName: props.editingInfo.lastName || "",
    email: props.editingInfo.email || "",
    gender: props.editingInfo.gender || false,
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

    let response = await props.axios.put(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/students/${
        props.editingInfo.id
      }`,
      student
    );

    setStudentInfo({
      firstName: "",
      lastName: "",
      email: 0,
      gender: false,
    });
    props.setStudents(response.data);

    props.setShowEditModal(false);
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

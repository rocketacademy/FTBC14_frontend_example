import { useState } from "react";

export default function EditModal(props) {
  console.log(props);
  const [student, setStudentInfo] = useState({
    name: props.editingInfo.name || "",
    age: props.editingInfo.age || 0,
    course: props.editingInfo.course || "",
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
      name: "",
      age: 0,
      course: "",
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
    </>
  );
}

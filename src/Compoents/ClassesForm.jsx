import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClassesForm(props) {
  const navigate = useNavigate();

  const [classInfo, setClassInfo] = useState({
    name: "",
    description: "",
    fullTime: true,
    teacher: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(classInfo);

    let response = await props.axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/classes`,
      classInfo,
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    console.log(response);

    setClassInfo({
      name: "",
      description: "",
      fullTime: true,
      teacher: "",
    });
    navigate("/classes");
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setClassInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  function onValueChange(event) {
    // Updating the state with the selected radio button's value
    setClassInfo((prevState) => {
      return { ...prevState, fullTime: event.target.value };
    });
  }

  return (
    <>
      <props.Link to="/"> Home</props.Link>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={classInfo.name}
          onChange={handleChange}
          placeholder="Add Class Name"
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={classInfo.description}
          onChange={handleChange}
          placeholder="Add description of class"
        />
        <label>Teacher</label>
        <input
          type="text"
          name="teacher"
          value={classInfo.email}
          onChange={handleChange}
        />
        <label>Fulltime</label>
        <input
          type="radio"
          value={true}
          // Checking this radio button if the selected option is "Male"
          checked={classInfo.fullTime === true}
          onChange={onValueChange}
        />
        <label>Part Time </label>
        <input
          type="radio"
          value={false}
          // Checking this radio button if the selected option is "Male"
          checked={classInfo.fullTime === false}
          onChange={onValueChange}
        />
        <input value="submit" type="submit" />
      </form>
    </>
  );
}

export default ClassesForm;

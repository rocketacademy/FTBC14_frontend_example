import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UserForm from "./Compoents/UserForm";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/students`
        );
        let unPacked = data.data;
        console.log(unPacked);
        setStudents(unPacked);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      let data = await axios.delete(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/students/${id}`
      );
      let unPacked = data.data;
      console.log(unPacked);
      setStudents(unPacked);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        {/* Add a modal to edit the post thats clicked on  */}

        <UserForm setStudents={setStudents} />

        <h1>Rocket Students</h1>
        {students && students.length > 0 ? (
          students.map((element) => {
            return (
              <div key={element.id}>
                <h1>{element.name}</h1>
                <h4>
                  {element.course} - {element.age}
                </h4>
                <button onClick={() => handleDelete(element.id)}>
                  Delete Me
                </button>
              </div>
            );
          })
        ) : (
          <p>No one is here</p>
        )}
      </div>
    </>
  );
}

export default App;

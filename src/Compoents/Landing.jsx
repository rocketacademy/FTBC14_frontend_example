import { useState, useEffect } from "react";
import EditModal from "./EditModal";

export default function Landing(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        let data = await props.axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/students`
        );
        let unPacked = data.data;
        console.log(unPacked);
        props.setStudents(unPacked);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      let data = await props.axios.delete(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/students/${id}`
      );
      let unPacked = data.data;
      console.log(unPacked);
      props.setStudents(unPacked);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditModal = (element) => {
    setShowEditModal(true);
    setEditingInfo(element);
  };

  return (
    <>
      {showEditModal ? (
        <EditModal
          setShowEditModal={setShowEditModal}
          editingInfo={editingInfo}
          axios={props.axios}
          setStudents={props.setStudents}
        />
      ) : (
        <div>
          {/* Add a modal to edit the post thats clicked on  */}
          <props.Link to="form"> Form</props.Link>

          <h1>Rocket Students</h1>
          {props.students && props.students.length > 0 ? (
            props.students.map((element) => {
              return (
                <div key={element.id}>
                  <h1>{element.name}</h1>
                  <h4>
                    {element.course} - {element.age}
                  </h4>
                  <props.Link to={`/profile/${element.id}`}>Profile</props.Link>
                  <button onClick={() => handleEditModal(element)}>
                    Edit Me
                  </button>

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
      )}
    </>
  );
}

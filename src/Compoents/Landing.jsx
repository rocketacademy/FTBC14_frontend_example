import { useState, useEffect } from "react";
import EditModal from "./EditModal";
import { useAuth0 } from "@auth0/auth0-react";

export default function Landing(props) {
  const {
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
    isAuthenticated,
    user,
  } = useAuth0();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      props.setUser(user);
      getAccessTokenSilently().then((token) => {
        console.log("access token", token);
      });
    }
  });

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
          <div className="flexCenter">
            {/* {isAuthenticated ? ( */}
            <div>
              <props.Link to="form">User Form</props.Link>
              <props.Link to="class">Classes Form</props.Link>
              <props.Link to="classes"> Classes</props.Link>
              {/* </div>
            ) : ( */}
              <props.Link to="usersClasses"> Users Classes</props.Link>
              <props.Link to="addressForm"> Address Form</props.Link>
              {/* )} */}

              {isAuthenticated ? (
                <button onClick={() => logout()}>Log out</button>
              ) : (
                <button onClick={() => loginWithRedirect()}>Log In</button>
              )}
            </div>
          </div>

          <h1>Rocket Students</h1>
          {props.students && props.students.length > 0 ? (
            props.students.map((element) => {
              return (
                <div key={element.id}>
                  <h1>
                    {element.firstName} {element.lastName}
                  </h1>
                  <h4>
                    {element.email} -{" "}
                    {element.gender == true ? "Male" : "Female"}
                  </h4>

                  {element.usersAddresses && element.usersAddresses.length > 0
                    ? element.usersAddresses.map((usersAddress) => (
                        <p key={usersAddress.id}>
                          {usersAddress.address}-
                          {usersAddress.primaryAddress ? "Primary" : null}
                        </p>
                      ))
                    : null}
                  <props.Link to={`/profile/${element.id}`}>Profile</props.Link>
                  <button onClick={() => handleEditModal(element)}>
                    Edit Me
                  </button>

                  <button onClick={() => handleDelete(element.id)}>
                    Delete Me
                  </button>

                  <props.Link to="/addressForm">Address Form</props.Link>
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

import { useState, useEffect } from "react";

export default function UsersClasses(props) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    let getData = async () => {
      let data = await props.axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/classes/users`
      );
      console.log(data.data);
      setClasses(data.data);
    };
    getData();
  }, []);

  return (
    <div>
      <props.Link to="/"> Home</props.Link>

      {classes && classes.length > 0 ? (
        classes.map((classInstance) => (
          <div
            key={classInstance.id}
            style={{
              backgroundColor: classInstance.fullTime ? "#2b2b2b " : "#127475",
            }}
          >
            <h2>{classInstance.name}</h2>
            <h3>{classInstance.description}</h3>
            <h4>{classInstance.teacher}</h4>

            {classInstance.users && classInstance.users.length > 0 ? (
              classInstance.users.map((user) => {
                return (
                  <div key={user.id}>
                    <p>
                      {user.firstName} -{user.lastName} -
                      {user.gender ? "Male" : "Female"}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>No users signed up</p>
            )}
          </div>
        ))
      ) : (
        <p>No classes added, please add a class</p>
      )}
    </div>
  );
}

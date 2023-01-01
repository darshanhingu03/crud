import "./App.css";
import { useState, Fragment, useEffect } from "react";

const getLocalItems = () => {
  let users = localStorage.getItem("user");
  if (users) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [editUsers, setEditUsers] = useState(null);

  const addUser = (e) => {
    e.preventDefault();
    if (name === "" && password === "") {
      alert("Enter Name or Password");
    } else if (name && password && !toggle) {
      setUser(
        user.map((ele) => {
          if (ele.id === editUsers) {
            return { ...ele, name, password };
          }
          setName("");
          setPassword("");
          setToggle(true);
          return ele;
        })
      );
    } else {
      setUser((user) => {
        const newData = {
          id: new Date().getTime().toString(),
          name,
          password,
        };
        const updateUser = [...user, newData];
        setName("");
        setPassword("");
        return updateUser;
      });
    }
  };
  // add localStorage

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleEdit = (id) => {
    let editData = user.find((elem) => {
      return elem.id === id;
    });

    setToggle(false);

    setName(editData.name);
    setPassword(editData.password);

    setEditUsers(id);
  };

  const handleDelete = (index) => {
    const deleteUser = user.filter((ele) => {
      return index !== ele.id;
    });
    setUser(deleteUser);
  };

  return (
    <Fragment>
      <div className="cantainer">
        <div className="header">
          <h1>Demo Form</h1>
        </div>
        <div className="Form">
          <form onSubmit={addUser}>
            <div className="name">
              <label>Name</label>
              <input
                type="text"
                name="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="password">
              <label>Password</label>
              <input
                // {...(toggleButton ? (type = "password") : (type = "text"))}
                type={toggle ? "password" : "text"}
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {toggle ? (
              <button type="submit">Add</button>
            ) : (
              <button type="submit">Edit</button>
            )}
          </form>
        </div>
        <div className="table">
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Password</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>

            <tbody>
              {user.map((data) => (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.password}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(data.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

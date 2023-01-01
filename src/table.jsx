export const Table = ({ users, setUsers }) => {
  const removeUser = (index) => {
    const remove = users.filter((Ele, id) => {
      return index !== id;
    });
    setUsers(remove);
  };
  return (
    <table border="2">
      <thead>
        <tr>
          <th>email</th>
          <th>password</th>
          <th colSpan="2"> Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.email}</td>

              <td>{item.password}</td>
              <td>
                <button type="button">Edit</button>
              </td>
              <td>
                <button type="button" onClick={() => removeUser(index)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

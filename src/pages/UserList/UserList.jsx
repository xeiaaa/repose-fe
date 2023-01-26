import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { createUser, getUsers } from "../../api";
import { toast } from "react-toastify";

function UserList(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const init = async () => {
      const { data } = await getUsers();
      setUsers(data.results);
    };

    init();
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    onSubmit: async (values) => {
      const { data } = await createUser(values.email, values.name);

      formik.resetForm();
      setUsers((prev) => {
        return [...prev, data];
      });
      console.log({ data });

      toast("User created successfully!");
    },
  });
  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Leave Balance</th>
            <th>Used Leave</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.leaveBalance || 0}</td>
                  <td>{user.usedLeave || 0}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h3>Create User</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          type="text"
          value={formik.values.name}
          placeholder="Name"
          name="name"
          onChange={formik.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { getUsersBanned, updateBanned } from "../../../redux/actions/action";

function UsersAdmin() {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.allusers);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Hacer el dispatch para obtener los usuarios
    dispatch(getUsersBanned());
  }, [dispatch]);

  useEffect(() => {
    // Actualizar el estado local cuando se obtengan los usuarios
    setUsers(allusers);
  }, [allusers]);

  const handleSwitchChange = (id) => {
    // Encontrar el usuario por id y actualizar el estado local
    const updatedUsers = users.map((user) =>
      user.idUser === id ? { ...user, isBanned: !user.isBanned } : user
    );
    setUsers(updatedUsers);

    // Hacer el dispatch para actualizar el estado en el servidor
    dispatch(updateBanned(id));
  };

  return (
    <div>
      {" "}
      <h3 style={{ textAlign: "center" }}>Control de usuarios</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Locked?</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUser}>
              <td>{user.nameUser}</td>
              <td>{user.email}</td>
              <td>
                <Switch
                  onChange={() => handleSwitchChange(user.idUser)}
                  checked={user.isBanned}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersAdmin;

import { useEffect, useState } from "react";
import { GetFromStorage } from "../../services/StorageService";
import { useNavigate } from "react-router-dom";
import { GetUsers } from "../../services/UserService";
import "./style.css";
import { GetRoles } from "../../services/RoleService";
const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [roles, setRoles] = useState([]);

  const changeRole = (userId, roleName, checked) => {
    //get the user from the users array
    const user = users.find(user => user.id === userId);
    //get the role from the roles array
    const role = roles.find(role => role.nombre === roleName);
    //if the role is checked, add it to the user
    if (checked) {
      user.roles.push(role);
    } else {
      //if the role is unchecked, remove it from the user
      user.roles = user.roles.filter(userRole => userRole.nombre !== roleName);
    }
    console.log(JSON.stringify(user));
    //update the user in the users array
    setusers(users.map(u => u.id === userId ? user : u));
    
  }

  useEffect(() => {
    document.title = "Admin Panel";
    const roleList = GetFromStorage("roles");
    if (roleList?.length != 0 && !roleList?.includes("ADMIN")) {
      navigate("/dashboard");
    }
    GetUsers().then((response) => {
      console.log(response.result);
      setusers(response.result);
    });

    GetRoles().then((response) => {
      console.log(response);
      setRoles(response.result);
    });

    
  }, []);
  return (
    <main>
      <h1>Welcome back, admin!</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
  <tr key={user.id}>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.username}</td>
    <td>{user.email}</td>
    <td>
      {roles.map((role) => (
        <span key={role.id}>
          <input
            type="checkbox"
            checked={user.roles.some(userRole => userRole.nombre === role.nombre)}
            onChange={e => changeRole(user.id, role.nombre, e.target.checked)}
          />
          {role.nombre}
        </span>
      ))}
    </td>
  </tr>
))}

        </tbody>
      </table>
    </main>
  );
};

export default AdminPanel;

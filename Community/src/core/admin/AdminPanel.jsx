import { useEffect, useState } from "react";
import { GetFromStorage } from "../../services/StorageService";
import { useNavigate } from "react-router-dom";
import { GetUsers, UpdateUser } from "../../services/UserService";
import "./style.css";
import { GetRoles } from "../../services/RoleService";
const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [roles, setRoles] = useState([]);

  const changeRole = (userId, roleName, checked) => {
    
    const user = users.find((user) => user.id === userId);

    user.roles.forEach(role => {
      role.usuarios = [];
    });
    

    const role = roles.find((role) => role.nombre === roleName);
    role.usuarios = [];
    if (checked) {
      user.roles.push(role);
    } else {
      user.roles = user.roles.filter(
        (userRole) => userRole.nombre !== roleName
      );
    }
    console.log(JSON.stringify(user));

    UpdateUser(user);
    setusers(users.map((u) => (u.id === userId ? user : u)));
  };

  useEffect(() => {
    document.title = "Admin Panel";
    const roleList = GetFromStorage("roles");
    if (roleList?.length != 0 && !roleList?.includes("ADMIN")) {
      //Not an admin, get out!
      navigate("/dashboard");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    GetUsers().then((response) => {
      console.log(response.result);
      setusers(response.result);
    });

    GetRoles().then((response) => {
      console.log(response);
      //set roles.users = [] to avoid circular references
      response.result.forEach((role) => (role.usuarios = []));

      setRoles(response.result);
    });
  };
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
                  <span key={role.id} className="role-checkbox">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={user.roles.some(
                          (userRole) => userRole.nombre === role.nombre
                        )}
                        onChange={(e) =>
                          changeRole(user.id, role.nombre, e.target.checked)
                        }
                      />
                      <span className="custom-checkbox"></span>
                      {role.nombre}
                    </label>
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

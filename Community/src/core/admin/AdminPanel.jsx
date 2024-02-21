import { useEffect, useState } from "react";
import { GetFromStorage } from "../../services/StorageService";
import { useNavigate } from "react-router-dom";
import { GetUsers } from "../../services/UserService";
import "./style.css";
const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);

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
  }, []);
  return <main>
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
                <ul>
                  {user.roles.map(role => (
                    <li key={role.id}>{role.nombre}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
  </main>;
};

export default AdminPanel;

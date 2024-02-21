import React, { useEffect, useState } from "react";
import "./Register.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { register } from "../../services/AuthService";
import { GetFromStorage } from "../../services/StorageService";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const MySwal = withReactContent(Swal);

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(0);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Community | Registro";

    const roleList = GetFromStorage("roles");


    //check if "ADMIN" is in the role list
    if (roleList?.length!= 0 && !roleList?.includes("ADMIN")) {
      navigate("/dashboard");
    }
    //Users without admin role can't access to this page

  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      MySwal.fire({
        title: <p>Iniciando sesion, esto puede tardar un poco</p>,
        didOpen: () => {
          MySwal.showLoading();
          register({email, username, password, role : selectedRole })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o contraseña incorrectos",
              });
            }).then(() => {
              MySwal.close();
            });
        },
      });
    }
  };

  const validateFields = () => {
    if (!username) {
      setErrorUser("El nombre de usuario es obligatorio");
    } 
    if(!password){
        seterrorPassword("La contraseña es obligatoria");
    }
    if(!email){
        setErrorEmail("El correo es obligatorio!")
    }

    if (!username || !password || !email) {
      return false;
    }
    setErrorUser("");
    seterrorPassword("");
    setErrorEmail("")
    return true;
  };

  return (
    <main>
      <div className="login-container">
        <h2>¡Unete a Community!</h2>
        <form>
        <div>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              value={email}
              onFocus={() => setErrorEmail("")}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <p className="error">{errorEmail}</p>
          </div>

          <div>
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onFocus={() => setErrorUser("")}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
            <p className="error">{errorUser}</p>
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              autoCapitalize="off"
              onFocus={() => seterrorPassword("")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="error">{errorPassword}</p>
          </div>

          <div id="role">
          <select
            name="role"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value={1}>Residente</option>
            <option value={2}>Administrador</option>
            <option value={3}>Contable</option>
            <option value={4}>Guardia</option>
            <option value={5}>Trabajador</option>
            <option value={6}>Propietario</option>
          </select>
          </div>

          <button
            className="moving-gradient-button"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Registrar usuario
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;

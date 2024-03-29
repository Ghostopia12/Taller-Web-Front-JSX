import { useEffect, useState } from "react";
import "./Register.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { register } from "../../services/AuthService";
import { GetFromStorage } from "../../services/StorageService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const MySwal = withReactContent(Swal);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(3);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const [name, setName] = useState("");
  const [errorName, setSetErrorName] = useState("");
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const handleRoleChange2 = (e) => {
    const value = parseInt(e.target.value);
    if (selectedRoles.includes(value)) {
      setSelectedRoles(selectedRoles.filter((role) => role !== value));
    } else {
      setSelectedRoles([...selectedRoles, value]);
    }
  };
  const navigate = useNavigate();
  const roleList = GetFromStorage("roles");

  useEffect(() => {
    document.title = "Community | Registro";
    if (
      roleList?.length != 0 &&
      !roleList?.includes("ADMIN") &&
      !roleList?.includes("PROPIETARIO")
    ) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      MySwal.fire({
        title: <p>Registrando usuario, esto puede tardar un poco</p>,
        didOpen: () => {
          MySwal.showLoading();
          register({
            email,
            username,
            password,
            Name: name,
            Roles: selectedRoles.length > 0 ? selectedRoles : [selectedRole],
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal, intentalo de nuevo",
              });
            })
            .then(() => {
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
    if (!password) {
      seterrorPassword("La contraseña es obligatoria");
    }
    if (!email) {
      setErrorEmail("El correo es obligatorio!");
    }

    if (!name) {
      setSetErrorName("El nombre es obligatorio");
    }

    if (!username || !password || !email || !name) {
      return false;
    }
    setErrorUser("");
    seterrorPassword("");
    setErrorEmail("");
    setSetErrorName("");
    return true;
  };

  return (
    <main>
      <div className="login-container">
        <h2>¡Unete a Community!</h2>
        <form>
          <div className="nose">
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
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={name}
                onFocus={() => setSetErrorName("")}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
              <p className="error">{errorName}</p>
            </div>
          </div>

          <div className="nose">
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
          </div>

          <div id="role">
            {roleList?.includes("ADMIN") ? (
              <>
                <div>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="role"
                      value={1}
                      checked={selectedRoles.includes(1)}
                      onChange={handleRoleChange2}
                    />
                    <span className="custom-checkbox"></span>
                    Administrador
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="role"
                      value={2}
                      checked={selectedRoles.includes(2)}
                      onChange={handleRoleChange2}
                    />
                    <span className="custom-checkbox"></span>
                    Contable
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="role"
                      value={3}
                      checked={selectedRoles.includes(3)}
                      onChange={handleRoleChange2}
                    />
                    <span className="custom-checkbox"></span>
                    Residente
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="role"
                      value={4}
                      checked={selectedRoles.includes(4)}
                      onChange={handleRoleChange2}
                    />
                    <span className="custom-checkbox"></span>
                    Guardia
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="role"
                      value={5}
                      checked={selectedRoles.includes(5)}
                      onChange={handleRoleChange2}
                    />
                    <span className="custom-checkbox"></span>
                    Trabajador
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="role"
                      value={6}
                      checked={selectedRoles.includes(6)}
                      onChange={handleRoleChange2}
                    />
                    <span className="custom-checkbox"></span>
                    Propietario
                  </label>
                </div>
              </>
            ) : (
              <>
                <select
                  name="role"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value={3} selected>
                    Residente
                  </option>
                </select>
              </>
            )}
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

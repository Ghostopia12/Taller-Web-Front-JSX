import { useEffect, useState } from "react";
import "./Login.css";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";

const Login = () => {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      MySwal.fire({
        title: <p>Iniciando sesion, esto puede tardar un poco</p>,
        didOpen: () => {
          MySwal.showLoading()
        login({ username, password }).then((response) => {
          if(response){
            MySwal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: 'Inicio de sesión exitoso',
            }).then(() => {
              navigate("/");
            })
          }
        }).catch((error) => {
          console.log(error);
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos',
          })
          return;
        }).then(() => {
         
        })
        ;
      },
    })
  }
  };

  const validateFields = () => {
    if (!username) {
      setErrorUser("El nombre de usuario es obligatorio");
    } else if (!password) {
      seterrorPassword("La contraseña es obligatoria");
    }

    if (!username || !password) {
      return false;
    }
    setErrorUser("");
    seterrorPassword("");
    return true;
  };

  useEffect(() => {
   
  }, [])
  

  return (
    <main>
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form>
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
          <button
            className="moving-gradient-button"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;

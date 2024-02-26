import axios from "axios";


export const getListaNotificaciones = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/notificaciones/", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };


export const getNotificacion = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/notificaciones/" + id + "/", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

export const addNotificacion = (notificacion) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/notificaciones/", notificacion, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }





export const deleteNotificacion = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete("http://localhost:3000/notificaciones/" + id + "/", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }


  export const deshabilitarNotificacion = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/notificaciones/" + id + "/disable", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }


  export const habilitarNotificacion= (id) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/notificaciones/" + id + "/enable", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }


  export const getNotificacionByUsuario = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/notificaciones/" + id + "/usuario", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }


  export const NroNotificaciones = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/notificaciones/count" + id, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

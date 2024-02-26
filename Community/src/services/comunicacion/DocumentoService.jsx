import axios from "axios";


export const getListaDocumentos = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/documento/", {
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


export const getDocumento = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/documento/" + id + "/", {
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

export const addDocumento = (documento) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/documento/", documento, {
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


export const updateDocumento = (id, data) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/documento/" + id, data, {
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


export const deleteDocumento = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete("http://localhost:3000/documento/" + id + "/", {
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


  export const deshabilitarDocumento = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/documento/" + id + "/disable", {
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


  export const habilitarDocumento = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/documento/" + id + "/enable", {
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



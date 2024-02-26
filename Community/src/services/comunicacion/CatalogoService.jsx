import axios from "axios";


export const getListaCatalogos = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/catalogo/", {
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


export const getCatalogo = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/catalogo/" + id + "/", {
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

export const addCatalogo = (catalogo) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/catalogo/", catalogo, {
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


export const updateCatalogo = (id, data) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/catalogo/" + id, data, {
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


export const deleteCatalogo = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete("http://localhost:3000/catalogo/" + id + "/", {
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


  export const deshabilitarCatalogo = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/catalogo/" + id + "/disable", {
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


  export const habilitarCatalogo = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/catalogo/" + id + "/enable", {
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


  export const obtenerDocumentosPorCatalogo = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/catalogo/" + id + "/documentos", {
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

  export const eliminarDocumentoEnCatalogo = (catalogoId, documentoId) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/catalogo/" + catalogoId + "/remove-documento/" + documentoId, {
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


  export const agregarDocumentoToCatalogo = (catalogoId, documentoId) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:3000/catalogo/" + catalogoId + "/add-documento/" + documentoId, {
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



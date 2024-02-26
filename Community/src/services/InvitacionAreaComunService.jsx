import axios from 'axios';

export const GetListainvitadosareacomun = () => {
    return new Promise((resolve, reject) => {
    axios.get("http://127.0.0.1:7214/api/invitadosareacomun/",{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
        resolve(response.data);
    }).catch((error) => {
        console.log("error");
        reject(error);
    });
    });
}

export const Deleteinvitadosareacomun = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete("http://127.0.0.1:7214/api/invitadosareacomun/"+id+"/",{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log("error");
            reject(error);
        });
    });
}

export const Getinvitadosareacomun = (id) => {
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:7214/api/invitadosareacomun/"+id+"/",{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log("error");
            reject(error);
        });
        });
}

export const Postinvitadosareacomun = (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("carnet", data.carnet);
    formData.append("placaVehiculo", data.placavehiculo);
    formData.append("fecha", data.fecha);
    formData.append("areacomun_id", data.areascomunes_id);
    formData.append("dueo_id", data.dueno_id);
    formData.append("ingreso", 0);
    formData.append("condominio_id",parseInt(localStorage.getItem('residencial_id')))
    return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:7214/api/invitadosareacomun/", formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log("error");
            reject(error);
        });
    });
}

export const Putinvitadosareacomun = (id, data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("carnet", data.carnet);
    formData.append("placaVehiculo", data.placavehiculo);
    formData.append("fecha", data.fecha);
    formData.append("areacomun_id", data.areascomunes_id);
    formData.append("dueo_id", data.dueno_id);
    formData.append("ingreso", 0);
    formData.append("condominio_id",parseInt(localStorage.getItem('residencial_id')))
    return new Promise((resolve, reject) => {
        axios.put("http://127.0.0.1:7214/api/invitadosareacomun/"+id+"/", formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log("error");
            reject(error);
        });
    });
}

export const GetListaDuenos = () => {
    return new Promise((resolve, reject) => {
    axios.get("http://127.0.0.1:7777/api/users-rol/",{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
        resolve(response.data);
    }).catch((error) => {
        console.log(error);
        reject(error);
    });
    });
}

export const GetListaAreasComunes = () => {
    return new Promise((resolve, reject) => {
    axios.get("http://127.0.0.1:7777/api/areacomun/",{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
        resolve(response.data);
    }).catch((error) => {
        console.log(error);
        reject(error);
    });
    });
}

export const getresidencial = (id) => {
    return new Promise((resolve, reject) => {
    axios.get("http://127.0.0.1:8000/webapi/inmuebles/"+id+"/residencia-usuario/",{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
        resolve(response.data);
    }).catch((error) => {
        console.log(error);
        reject(error);
    });
    }
    );
}

export const getListaBloquesId = (id) => {
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:8000/webapi/tipo_division_bloque/"+id+"/", {
            headers: {
                "Content-Type": "application/json",
                
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error");
                reject(error);
            });
    });
}


export const Putinvitadosareacomun2 = (id) => {
    return new Promise((resolve, reject) => {
        axios.patch("http://127.0.0.1:7214/api/invitadosareacomun/"+id+"/", {ingreso: 1},{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log("error");
            reject(error);
        });
    });
}
import jwtDecode from "jwt-decode";

let status = 0;
let request_options = {};
const base_url = "http://localhost:8080";
let token = null;

const getDataToken = inputToken => {
    return jwtDecode(inputToken);
}

const setToken = newtoken => {
    window.sessionStorage.setItem("token", newtoken);
    token = `Bearer ${newtoken}`;
}

const getToken = () => {
    return window.sessionStorage.getItem("token");
}

const deleteToken = () => {
    token = null;
    window.sessionStorage.removeItem("token");
}

const disabledUser = async (email) => {
    request_options = {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    };
    return fetch(base_url+'/persona/desactivar/'+email, request_options)
            .then(response => {
                return response.status;
            })
            .catch(error => console.log("Error al desactivar cuenta", error))
}

const updateUser = async (data) => {
    request_options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    };
    return fetch(base_url+'/persona/update', request_options)
            .then(response => {
                let text = response.text();
                status = response.status;
                return text;
            })
            .then(data => {
                if(status === 200 && data !== "")  return data
                else return null;
            })
            .catch(error => console.log("Error al actualizar usuario", error))
}

const onLogin = async (email, password) => {
	request_options = {
		method: 'GET',
		mode: 'cors',
	}
    return fetch(base_url+'/persona/auth/?Email='+email+"&Contraseña="+password, request_options)
		.then(response => {
			let text = response.text();
			status = response.status;
			return text;
		})
		.then(data => {
            if( status === 200 && data !== "" ) return data;
            else return null;
		})
		.catch(error => console.log("Error en el login", error))
}

export default { onLogin, updateUser, disabledUser, setToken, getToken, getDataToken, deleteToken };

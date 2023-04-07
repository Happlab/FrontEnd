import jwtDecode from "jwt-decode";
import { environment } from "../environments/environment";

let status = 0;
let request_options = {};
let token = null;
const key = "token";
let url = "";

const getDataToken = inputToken => {
    let data = null;
    try {
        data = jwtDecode(inputToken);
    } catch (e) {
        data = null;
    }
    return data;
}

const setToken = newtoken => window.sessionStorage.setItem(key, newtoken);

const getToken = () => {
    let token = window.sessionStorage.getItem(key);
    return token ? token : null;
}

const deleteToken = () => {
    window.sessionStorage.removeItem(key);
    return null;
}

const disabledUser = async (email) => {
    url = environment.baseUrl + '/persona/desactivar/' + email;
    request_options = {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    };
    return fetch(url, request_options)
            .then(response => {
                return response.status;
            })
            .catch(error => console.log("Error al desactivar cuenta", error))
}

const updateUser = async (data) => {
    url = environment.baseUrl + '/persona/update';
    request_options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    };
    return fetch(url, request_options)
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
    url = environment.baseUrl + '/persona/auth/?Email=' + email + "&Contraseña=" + password;
	request_options = {
		method: 'GET',
		mode: 'cors',
	};
    return fetch(url, request_options)
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { onLogin, updateUser, disabledUser, setToken, getToken, getDataToken, deleteToken };

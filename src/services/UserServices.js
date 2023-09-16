import jwtDecode from "jwt-decode";
import { environment } from "../environments/environment";

const key = "token";
let request_options = {};
let token = null;
let url = "";

const getDataToken = inputToken => {
    let data = null;
    try {
        data = jwtDecode(inputToken);
    } catch (error) {
        console.log("Error en la obtencion de la informacion del token. ", error);
    }
    return data;
};

const setToken = newtoken => window.sessionStorage.setItem(key, newtoken);

const getToken = () => window.sessionStorage.getItem(key);

const deleteToken = () => window.sessionStorage.removeItem(key);

const disabledUser = async (email) => {
    try {
        url = environment.baseUrl + '/persona/desactivar/' + email;
        request_options = {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        };
        let data = await fetch(url, request_options);
        let response = await data.json();
        return response;
    } catch (error) {
        console.log("error al desactivar cuenta. ", error);
    }
};

const updateUser = async (dataInput) => {
    try {
        url = environment.baseUrl + '/persona/update';
        request_options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(dataInput)
        };
        let data = await fetch(url, request_options);
        let response = await data.json();
        return response;
    } catch (error) {
        console.log("Error al actualizar usuario. ", error);
    }
};

const onLogin = async (email, password) => {
    try {
        url = environment.baseUrl + '/persona/auth/?Email=' + email + "&Contraseña=" + password;
	    request_options = {
		    method: 'GET',
    		mode: 'cors',
    	};
        let data = await fetch(url, request_options);
        let response = await data.json();
        return response;
    } catch (error) {
        console.log("Error en el login. ", error);
    }
};

const registerUser = async (dataInput) => {
    try {
        url = environment.baseUrl + "/persona/registro";
        request_options = {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(dataInput),
        };
        let data = await fetch(url, request_options);
        return data.status === 200;
    } catch(error) {
        console.log("Error al registrar el usuario nuevo", error);
    }
    return false;
};

// eslint-disable-next-line import/no-anonymous-default-export
export { onLogin, updateUser, disabledUser, setToken, getToken, getDataToken, deleteToken, registerUser };

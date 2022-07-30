import jwtDecode from "jwt-decode";

let status = 0;
let request_options = {};
let token = null;
const base_url = "http://localhost:8080";
const key = "token";

const getDataToken = inputToken => {
    let data = jwtDecode(inputToken);
    return data;
}

const setToken = newtoken => {
    localStorage.setItem(key, newtoken);
    token = `Bearer ${newtoken}`;
}

const getToken = () => {
    return localStorage.getItem(key);
}

const deleteToken = () => {
    localStorage.removeItem(key);
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

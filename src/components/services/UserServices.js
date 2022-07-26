let status = 0;
let request_options = {};

export async function disabledUser(email) {
    request_options = {
        method: 'DELETE',
    };
    return fetch('https://api-happlab.herokuapp.com/persona/desactivar/'+email, request_options)
            .then(response => {
                return response.status;
            })
            .catch(error => console.log("Error al desactivar cuenta", error))
}

export async function updateUser(data) {
    request_options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch('https://api-happlab.herokuapp.com/persona/update', request_options)
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

export async function onLogin(email, password) {
	request_options = {
		method: 'GET',
		mode: 'cors',
	}
	return fetch('https://api-happlab.herokuapp.com/persona/Login/'+email+"&"+password, request_options)
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

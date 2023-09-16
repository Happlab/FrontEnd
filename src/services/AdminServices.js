let request_options = {};

const peticionGet = async (url) => {
    try {
        request_options = {
            method: 'GET',
            mode: 'cors',
            ContentType: 'application/json',
            headers:{
                'Access-Control-Allow-Origin': '*'
            }
        };
        let data = await fetch(url, request_options);
        let response = await data.json();
        return response;
    } catch(error) {
        console.log("Error en la peticion con el verbo GET. ", error);
    }
};

const peticionEnvio = async (objetoAModificar, url, metodo) => {
    try {
        request_options = {
            method: metodo,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(objetoAModificar)
        };
        let data = await fetch(url, request_options);
        return data.status === 200;
    } catch(error) {
        console.log("Error en la peticion de envio de datos. ", error);
    }
};

const peticionEnvioDataFrom = async (objetoAModificar, url, metodo) => {
    try {
        request_options = {
            method: metodo,
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: objetoAModificar
        };
        let data = await fetch(url, request_options);
        return data.ok;
    } catch(error) {
        console.log("Error en la peticion de envio del datafrom. ", error);
    }
};

export { peticionGet, peticionEnvio, peticionEnvioDataFrom }

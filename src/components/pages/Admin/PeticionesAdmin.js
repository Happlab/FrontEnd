export function PeticionGet(url) {
    let status = 0;
    let content;
    const request_options = {
        method: 'GET',
        mode: 'cors',
        ContentType: 'application/json',
        headers:{
            'Access-Control-Allow-Origin': '*'
        }
    }
    return fetch(url, request_options)
        .then(response => {
            content = response.json(); 
            status = response.ok;
            return content;
        })
        .then(data => { 
            console.log(data);
            if( status && data !== "" ){
                return data;
            }else{
                return null;
            }
        })
        .catch(error => console.log("Error", error));
}

export function PeticionEnvio(objetoAModificar, url, metodo){
    const requestOptions = {
        method: metodo,
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(objetoAModificar)
    }
    return fetch(url, requestOptions)
        .then(response => {
            console.log("Response", response)
            if (response.status === 200) return true
            else{
                return false;
            } 
            
        })
        .catch(error => console.log("Error", error))
}

export function PeticionEnvioDataFrom(objetoAModificar, url, metodo){
    const requestOptions = {
        method: metodo,
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: objetoAModificar
    }
    return fetch(url, requestOptions)
        .then(response => {
            console.log("Response", response)
            if (response.ok) return true
            else{
                return false;
            } 
            
        })
        .catch(error => console.log("Error", error))
}


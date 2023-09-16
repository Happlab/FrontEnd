import { environment } from "../environments/environment";

let url = "";
let requestOptions = {}

const listContent = async () => {
    let content = [];
    let contentNoPendiente = [];
    try {
        url = environment.baseUrl + "/contenido/";
        requestOptions = {
          method: "GET",
          mode: "cors",
          ContentType: "application/json",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        };
        let data = await fetch(url, requestOptions);
        let response = await data.json();
        content = (data.status === 200 & response !== "") ? Array.from(response) : [];
        content.filter((cont) => !cont.pendiente && cont.visible).map((contentFilter) => {
            return contentNoPendiente.push(contentFilter);
        })

    } catch (error) {
        console.log("Error al listar el contenido. ", error);
    }
    return contentNoPendiente;
}

const uploadContent = async (dataInput) => {
    try {
        url = environment.baseUrl + "/contenido/create";
        requestOptions = {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: dataInput,
        };
        let data = await fetch(url, requestOptions);
        let response = await data.json();
        return response;
    } catch(error) {
        console.log("Error al subir el contenido. ", error);
    }
};

const updateCredit = async (email, credit) => {
    try {
        url = environment.baseUrl + "/persona/modToken/" + email + "&" + credit;
        requestOptions = {
            method: "PUT",
            mode: "cors",
            ContentType: "application/json",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
        let data = await fetch(url, requestOptions);
        let response = await data.json();
        return response;
    } catch(error) {
        console.log("Error al actualizar el credito. ", error);
    }
};

const writeComment = async (link, comment) => {
    try {
        url = environment.baseUrl + "/contenido/comentar/" + link;
        requestOptions = {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(comment),
        };
        let data = await fetch(url, requestOptions);
        let response = await data.json();
        return response;
    } catch(error) {
        console.log("Error al escribir un comentario. ", error);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export { listContent, uploadContent, updateCredit, writeComment };

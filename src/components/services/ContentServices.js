import { environment } from "../../environments/environment";

let status = 0;
let requestOptions = {}

const listContent = async () => {
    requestOptions = {
      method: "GET",
      mode: "cors",
      ContentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    let content = [];
    let contentNoPendiente = [];
    return fetch(environment.baseUrl + "/contenido/", requestOptions).then((response) => {
        status = response.status;
        return response.json();
    }).then((data) => {
        content = (status === 200 && data !== "") ? Array.from(data) : [];
        content.filter((cont) => !cont.pendiente && cont.visible).map((contentFilter) => {
            contentNoPendiente.push(contentFilter);
        })
        return contentNoPendiente;
    }).catch((error) => console.log("Error", error));
}

const uploadContent = async (data) => {
    requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: data,
    }
    return fetch(environment.baseUrl + "/contenido/create", requestOptions).then((response) => {
        status = response.status;
        return response.json();
    }).then((data) => {
        if(status === 200 && data !== "" && data !== undefined) return data;
        else return null;
    }).catch((error) => console.log("Error", error));
};

const updateCredit = async (email, credit) => {
    requestOptions = {
        method: "PUT",
        mode: "cors",
        ContentType: "application/json",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };
    return fetch(environment.baseUrl + "/persona/modToken/" + email + "&" + credit).then((response) => {
        console.log(response, credit);
    }).catch((error) => console.log("Error", error));
};

const writeComment = async (link, comment) => {
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
    return fetch(environment.baseUrl + "/contenido/comentar/" + link, requestOptions).then((response) => {
        return response.status;
    }).catch((error) => console.log("Error", error));
}

export default { listContent, uploadContent, updateCredit, writeComment }

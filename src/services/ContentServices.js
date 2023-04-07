import { environment } from "../../environments/environment";

let url = "";
let status = 0;
let requestOptions = {}

const listContent = async () => {
    url = environment.baseUrl + "/contenido/";
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
    return fetch(url, requestOptions).then((response) => {
        status = response.status;
        return response.json();
    }).then((data) => {
        content = (status === 200 && data !== "") ? Array.from(data) : [];
        content.filter((cont) => !cont.pendiente && cont.visible).map((contentFilter) => {
            return contentNoPendiente.push(contentFilter);
        })
        return contentNoPendiente;
    }).catch((error) => console.log("Error", error));
}

const uploadContent = async (data) => {
    url = environment.baseUrl + "/contenido/create";
    requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: data,
    }
    return fetch(url, requestOptions).then((response) => {
        status = response.status;
        return response.json();
    }).then((data) => {
        if(status === 200 && data !== "" && data !== undefined) return data;
        else return null;
    }).catch((error) => console.log("Error", error));
};

const updateCredit = async (email, credit) => {
    url = environment.baseUrl + "/persona/modToken/" + email + "&" + credit;
    requestOptions = {
        method: "PUT",
        mode: "cors",
        ContentType: "application/json",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };
    return fetch(url, requestOptions).then((response) => {
        console.log(response, credit);
    }).catch((error) => console.log("Error", error));
};

const writeComment = async (link, comment) => {
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
    return fetch(url, requestOptions).then((response) => {
        return response.status;
    }).catch((error) => console.log("Error", error));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { listContent, uploadContent, updateCredit, writeComment };

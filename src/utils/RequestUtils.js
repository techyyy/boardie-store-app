import cookies from "js-cookie";

export async function sendRequest(endpoint, method, body) {
    return fetch(endpoint, {
        method: method,
        headers: {
            'Authorization': cookies.get('Authorization')
        },
        body: body
    });
}
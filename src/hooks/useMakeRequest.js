import {useState, useEffect} from "react";
import cookies from 'js-cookie';

const useMakeRequest = (endpoint, method, body) => {
    const [result, setResult] = useState({
        data: null,
        error: null,
    });

    useEffect(() => {
        const asyncFunc = async () => {
            let authCookie = cookies.get('Authorization');
            authCookie ??= fetch(`http://localhost:3001/users/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username: "user",
                    password: "password"
                })
            });
            try {
                const response = await fetch(endpoint, {
                    method: method,
                    body: body,
                    headers: {
                        'Authorization': authCookie
                    }
                });
                const json = await response.json();
                setResult((old) => ({...old, data: json}));
            } catch (error) {
                setResult((old) => ({...old, error: new Error(error).message}));
            }
        };

        asyncFunc();
    }, [endpoint]);

    return result;
};

export default useMakeRequest;

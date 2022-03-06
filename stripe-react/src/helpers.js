import { auth } from "./firebase";
const API = 'http://localhost:3333';
// console.log(fetch(API))

export async function fetchFromAPI(endpointURL, opts){
    console.log(endpointURL, opts)
    const {method, body} = {method: 'POST', body: null, ...opts};

    const user = auth.currentUser;
    const token = user && (await user.getIdToken());
    console.log(`${API}/${endpointURL}`)

    const res = await fetch(`${API}/${endpointURL}`,{
        method,
        ...(body && {body: JSON.stringify(body)}),
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    // console.log(res)

    return res.json();
}
// import * from '../store/index.js'

export function authRequest(context, { auth, method, path, data, params, headers }) {
    console.log("Payload", auth, method, path, data, params, headers)
    const options = {
        url: path,
        baseURL: context.state.baseServer,
        method: method,
        headers: headers,
        data: data,
        params: params,
    }
    if (auth) {
        const authorization = {
            Authorization: `JWT ${context.state.jwtAccess}`,
            'Content-Type': 'application/json'
        }
        options.xhrFields = {
            withCredentials: true
        }
        options.headers = {...options.headers, ...authorization }
    }
    return options
}
export async function authenticatedRequest({ method, path, data, params, headers }) {
    console.log(method, path, data, params, headers)
    const options = await context.dispatch('request', {
        auth: true,
        path: path,
        method: method,
        headers: headers,
        data: data,
        params: params,
    });
    console.log(options)
    return await axios(options)
        // .then(response => {
        //     console.log('Response neew ', response.data)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
}
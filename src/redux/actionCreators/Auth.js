export const setLogintrue = (data) => {
    return {
        type: "LOGIN_TRUE",
        payload:data

    }
}

export const setLoginfalse = () => { 
    return {
        type: "LOGIN_FALSE",
    }
}

export const passToken = (token) => {
    return {
        type : "GET_TOKEN",
        token
    }
}
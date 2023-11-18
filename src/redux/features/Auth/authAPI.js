import { httpAxios } from "../../../services/httpAxios"


export const signup = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await httpAxios.post("/auth/signup", data);
            resolve(response.data);
        }catch(err){
            console.log(err.message);
            reject(err.response.data);
        }
    })
}

export const verify = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await httpAxios.post("/auth/verify", data);
            resolve(response.data);
        }catch(err){
            console.log(err.message);
            reject(err.response.data);
        }
    })
}

export const signin = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await httpAxios.post("/auth/signin", data);
            resolve(response.data);
        }catch(err){
            console.log(err.response.data);
            reject(err.response.data);
        }
    })
}
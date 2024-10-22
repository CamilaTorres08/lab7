import axios from "axios";
import { handleError } from "../Services/ErrorHandler";
import {User} from "./UserObj";

const API = 'http://localhost:80/auth/';



export const RegisterNewUser = async (userName: string, mail: string, password: string) => {
    try {
        const res = await axios.post(API+'register', {
            username: userName,
            email: mail,
            passwd: password
        });
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", res.data.userId);
        return res;
    }catch (error){
        handleError(error);
    }
    
}

export const LoginUser = async (userName: string, password:string) => {
    try {
        const res = await axios.post(API+'login', {
            username: userName,
            passwd: password
        });
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", res.data.userId);
        return res;
    }catch (error){
        handleError(error);
    }
    
}

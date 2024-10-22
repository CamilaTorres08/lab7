import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {RegisterNewUser, LoginUser} from '../Services/LoginService';
import axios from "axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import * as serviceTasks from '../Services/Service';

type UserContextType = {
    userId: string | null;
    token: string | null;
    registerUser: (email:string, username:string, passwd: string) => void;
    userLogin: (username:string, password:string) => void;
    logout:() => void;
    isLoggedIn: () => boolean;
    isAdmin: () => boolean;
    getTasks: () => any;
}

type Props = { children: React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children } : Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUser] = useState<string | null>(null);
    const[isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        const tokenUser = sessionStorage.getItem("token");
        if(user && token) {
            setUser(user);
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + tokenUser;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (email:string, username:string, password:string) => {
        await RegisterNewUser(username, email, password).then((res) => {
            if(res){
                //sessionStorage.setItem("token", res?.data.token);
                //sessionStorage.setItem("user", res?.data.userId);
                setToken(res.data.token);
                setUser(res.data.userId);
                navigate("/");
            }
        }).catch((e) => alert("Server error occured"));  
    };

    const userLogin = async (username:string, password:string) => {
        await LoginUser(username, password).then((res) => {
            if(res){
                console.log(sessionStorage.getItem("token"));
                setToken(res.data.token);
                setUser(res.data.userId);
                navigate(`/${res.data.userId}`);
            }
        }).catch((e) => alert("Server error occured"));  
    };

    const isLoggedIn = () => {
        return !!userId;
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate("/");
    }

    const isAdmin = () => {
        if(token){
            const role = Object.entries(jwtDecode(token))[0][1];
            return role === 'ADMIN';
        }
        return false;
        
    };

    const getTasks = async () => {
        const userId = sessionStorage.getItem("user");
        if (userId){
            await serviceTasks.getTasks(userId).then((res) => {
                if(res){
                    return res;
                }
            }).catch((e) => alert("Server error occured")); 
        }
      };


    return (
        <UserContext.Provider value={{ userLogin, userId, token, logout, isLoggedIn, registerUser, isAdmin, getTasks }}>
            {isReady ? children : null }
        </UserContext.Provider>
    )
};

export const useAuth = () => React.useContext(UserContext);
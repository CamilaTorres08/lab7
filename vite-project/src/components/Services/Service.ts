
import axios from "axios";
import { Task } from "./TaskObject";
import { handleError } from "../Services/ErrorHandler";

const API = 'http://localhost:80/taskManager/';


export const getTasks = async (idUser :string) => {
    try {
        console.log(sessionStorage.getItem("token"));
        const res = await axios.get(API+'getTasksByUser?userId='+idUser);
        console.log(res);
        return res;

    }catch (error){
        handleError(error);
    }
}

export const saveNewTask = async (idUser : string, newTask: Task) => {
    try {
        axios.post<any>(API+'saveTaskByUser?userId='+idUser, newTask);
    }catch (error){
        handleError(error);
    }
    
}

export const deleteTask = async (idTask: string) => {
    try {
        const data = axios.delete<any>(API+'delete?id='+idTask);
        return data;
    }catch (error){
        handleError(error);
    }
}

export const completeTask = async (idTask: string) => {
    try {
        const data = axios.patch<any>(API+'markTaskAsCompleted?id='+idTask);
        return data;
    }catch (error){
        handleError(error);
    }
}

export const randomTasks = async (idUser: string) => {
    try {
        return axios.post<any>(API+'generateTasks?idUser='+idUser);;
    }catch (error){
        handleError(error);
    }
    
}

export const getUser = async (id: string) => {
    try {
        const data = axios.get<string>(API+'getUser?idUser='+id);
        return data;
    }catch (error){
        handleError(error);
    }
}
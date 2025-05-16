import axios from "axios";


const host = "http://localhost:8080/api";

export const getUser = async() => {
    const response = await axios.get(`${host}/myPage`);
    return response.data;
}

export async function getTodoList(page: number, size: number) {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`);

    return res.data; // Page<TodoDTO>
}
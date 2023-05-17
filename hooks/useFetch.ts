import { AxiosError } from "axios";
import { useState } from "react";
import api from "../services/api";

const useFetch = <T>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    const get = async(url: string) => {
        try{
            setLoading(true);
            const response = await api.get(url);
            setData(response.data as T);
            setLoading(false);
        }catch(error){
            setError(error as AxiosError);
        }
    }

    const post = async(url: string, params: Object) => {
        try{
            setLoading(true);
            const response = await api.post(url, params);
            setData(response?.data);
            setLoading(false);
        }catch(error){
            setError(error as AxiosError);
        }
    }

    const put = async(url: string, params: Object) => {
        try{
            setLoading(true);
            const response = await api.put(url, params);
            setData(response?.data);
            setLoading(false);
        }catch(error){
            setError(error as AxiosError);
        }
    }

    const del = async(url: string) => {
        try{
            setLoading(true);
            const response = await api.delete(url);
            setData(response?.data);
            setLoading(false);
        }catch(error){
            setError(error as AxiosError);
        }
    }

    return {
        data,
        loading,
        get,
        post,
        del,
        put,
        error
    }
}

export default useFetch;
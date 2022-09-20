import axios from 'axios';
import { UserContext } from "./userContext";
import {useEffect, useContext} from "react";

const axiosPrivate = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

const useAxios = () => {
    const {user} = useContext(UserContext)

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accesstoken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accesstoken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [user])

    return axiosPrivate;
}

export default useAxios;
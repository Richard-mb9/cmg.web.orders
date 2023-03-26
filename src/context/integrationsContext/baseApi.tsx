import React, { createContext, PropsWithChildren } from 'react';
import axios, { AxiosInstance,AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';


interface IIntegrationsContext {
    api: AxiosInstance;
    authApi: AxiosInstance;
}

export const BaseApiContext = createContext({} as IIntegrationsContext);


export default function BaseApi({children}: PropsWithChildren<unknown>){

    const createApi = (baseUrl: string)=>{
        const instance = axios.create({
            baseURL: baseUrl,
        })

        instance.interceptors.response.use((response: AxiosResponse)=>{
            if (
                response.data &&
                response.headers['content-type'] === 'application/json'
              ) {
                response.data = camelizeKeys(response.data);
              }
            
              return response;
        });

        instance.interceptors.request.use((config: any/* AxiosRequestConfig */)=>{
            const newConfig = { ...config };

            if (newConfig.headers && newConfig.headers['Content-Type'] === 'multipart/form-data')
                return newConfig;

            if (config.data) {
                newConfig.data = decamelizeKeys(config.data);
            }

            return newConfig;
        });

        return instance;
    }


    const api = createApi('http://localhost:5001');

    const authApi = createApi('http://localhost:5000');

    return (
        <BaseApiContext.Provider value={{api, authApi}}>
            {children}
        </BaseApiContext.Provider>
    )

}